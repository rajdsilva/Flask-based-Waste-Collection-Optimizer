from app import app


def test_home_page():
    client = app.test_client()
    response = client.get('/')
    assert response.status_code == 200
    assert b'Waste-bin location map' in response.data


def test_bins_api_returns_coordinates():
    client = app.test_client()
    response = client.get('/api/bins')
    assert response.status_code == 200
    payload = response.get_json()
    assert len(payload['bins']) > 0
    for bin_data in payload['bins']:
        assert isinstance(bin_data['latitude'], (int, float))
        assert isinstance(bin_data['longitude'], (int, float))
        assert -90 <= bin_data['latitude'] <= 90
        assert -180 <= bin_data['longitude'] <= 180
