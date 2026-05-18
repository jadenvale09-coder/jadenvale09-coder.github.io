import os
import uuid

import pytest
import requests


# Lead API core coverage: validation + persistence + response shape
BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")


@pytest.fixture(scope="session")
def api_base_url():
    if not BASE_URL:
        pytest.skip("REACT_APP_BACKEND_URL is not set")
    return BASE_URL.rstrip("/")


@pytest.fixture
def api_client():
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


def test_create_lead_and_verify_persistence(api_client, api_base_url):
    token = uuid.uuid4().hex[:8]
    payload = {
        "name": f"TEST_Lead_{token}",
        "email": f"test_{token}@example.com",
        "message": "TEST_Message for conversion-focused website redesign.",
    }

    create_response = api_client.post(f"{api_base_url}/api/leads", json=payload, timeout=20)
    assert create_response.status_code == 200

    created = create_response.json()
    assert created["name"] == payload["name"]
    assert created["email"] == payload["email"]
    assert created["message"] == payload["message"]
    assert isinstance(created["id"], str) and created["id"]
    assert "_id" not in created

    get_response = api_client.get(f"{api_base_url}/api/leads", timeout=20)
    assert get_response.status_code == 200

    leads = get_response.json()
    assert isinstance(leads, list)
    matched = [lead for lead in leads if lead.get("id") == created["id"]]
    assert len(matched) == 1
    assert matched[0]["name"] == payload["name"]
    assert matched[0]["email"] == payload["email"]
    assert matched[0]["message"] == payload["message"]
    assert "_id" not in matched[0]


def test_create_lead_rejects_invalid_email(api_client, api_base_url):
    payload = {
        "name": "TEST_InvalidEmail",
        "email": "not-an-email",
        "message": "Valid length message for validation test.",
    }

    response = api_client.post(f"{api_base_url}/api/leads", json=payload, timeout=20)
    assert response.status_code == 422


def test_create_lead_rejects_short_message(api_client, api_base_url):
    payload = {
        "name": "TEST_ShortMessage",
        "email": "valid@example.com",
        "message": "short",
    }

    response = api_client.post(f"{api_base_url}/api/leads", json=payload, timeout=20)
    assert response.status_code == 422


def test_get_leads_items_have_expected_keys(api_client, api_base_url):
    response = api_client.get(f"{api_base_url}/api/leads", timeout=20)
    assert response.status_code == 200

    leads = response.json()
    assert isinstance(leads, list)
    if leads:
        sample = leads[0]
        assert set(["id", "name", "email", "message", "created_at"]).issubset(sample.keys())
        assert "_id" not in sample
