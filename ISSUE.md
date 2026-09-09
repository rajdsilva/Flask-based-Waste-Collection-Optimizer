# Issue: Fix map not showing and incorrect waste-bin coordinates

## Problem
The waste collection application had a frontend map/location issue: the map was not reliably displayed and waste-bin locations were not represented using verified latitude/longitude values.

## Fix implemented
- Added a working Leaflet map view.
- Added a `/api/bins` endpoint that returns bin coordinates as numeric latitude/longitude values.
- Added validation for coordinate ranges before creating markers.
- Added exact six-decimal coordinate display in the bin list and marker popup.
- Added automatic map fitting so all valid bins are visible.
- Added clickable bin cards that focus the corresponding marker.
- Added map loading/error status and API error handling.
- Added a responsive layout for smaller screens.

## Verification
Open the application root (`/`) and confirm that the map loads, markers appear, and clicking a bin card opens the matching marker. Refresh the page to verify that the map and markers load again.
