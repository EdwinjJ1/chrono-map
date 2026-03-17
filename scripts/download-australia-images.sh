#!/bin/bash
# Download images for Australia-wide locations (IDs 48-82)
# Uses Serper API for image search

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

if [ -f "$PROJECT_ROOT/.env.local" ]; then
  set -a
  . "$PROJECT_ROOT/.env.local"
  set +a
fi

SERPER_KEY="${SERPER_API_KEY:-}"
if [ -z "$SERPER_KEY" ]; then
  echo "SERPER_API_KEY is required. Add it to .env.local or your shell environment."
  exit 1
fi

MODERN_DIR="$PROJECT_ROOT/public/images/locations"
HISTORICAL_DIR="$PROJECT_ROOT/public/images/locations/historical"

mkdir -p "$MODERN_DIR" "$HISTORICAL_DIR"

SUCCESS=0
FAIL=0

# Search Serper for image URLs and return best one
serper_image() {
  local query="$1"
  local result
  result=$(curl -s "https://google.serper.dev/images" \
    -H "X-API-KEY: $SERPER_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"q\": \"$query\", \"num\": 10}" 2>/dev/null)
  # Return first valid imageUrl (not svg, not tiny)
  echo "$result" | python3 -c "
import sys, json
try:
  d = json.load(sys.stdin)
  for img in d.get('images', []):
    url = img.get('imageUrl', '')
    if url and not url.endswith('.svg') and 'placeholder' not in url.lower():
      print(url)
      break
except:
  pass
" 2>/dev/null
}

# Download a URL to dest, skip if already exists
download() {
  local dest="$1"
  local url="$2"

  if [ -f "$dest" ] && [ "$(wc -c < "$dest")" -gt 10000 ]; then
    echo "  ✓ exists: $(basename $dest)"
    return 0
  fi

  if [ -z "$url" ]; then
    echo "  ✗ no URL found for: $(basename $dest)"
    FAIL=$((FAIL + 1))
    return 1
  fi

  curl -sL --max-time 20 \
    --user-agent "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" \
    -o "$dest" "$url" 2>/dev/null

  local size=$(wc -c < "$dest" 2>/dev/null || echo 0)
  if [ "$size" -gt 10000 ]; then
    echo "  ✓ $(basename $dest) (${size} bytes)"
    SUCCESS=$((SUCCESS + 1))
    return 0
  else
    echo "  ✗ too small (${size}b): $(basename $dest) — $url"
    rm -f "$dest"
    FAIL=$((FAIL + 1))
    return 1
  fi
}

# Search + download combo
fetch() {
  local dest="$1"
  local query="$2"
  local url
  url=$(serper_image "$query")
  download "$dest" "$url"
}

echo "=== Phase 1: Modern Images (IDs 48–82) ==="

fetch "$MODERN_DIR/old-melbourne-gaol.jpg"           "Old Melbourne Gaol exterior bluestone"
fetch "$MODERN_DIR/eureka-centre-ballarat.jpg"       "Eureka Centre Museum Ballarat MADE building"
fetch "$MODERN_DIR/royal-exhibition-building.jpg"    "Royal Exhibition Building Melbourne dome"
fetch "$MODERN_DIR/port-arthur.jpg"                  "Port Arthur Historic Site Tasmania ruins"
fetch "$MODERN_DIR/mona-hobart.jpg"                  "MONA Museum Old New Art Hobart exterior"
fetch "$MODERN_DIR/story-bridge-brisbane.jpg"        "Story Bridge Brisbane Queensland night"
fetch "$MODERN_DIR/lone-pine-koala.jpg"              "Lone Pine Koala Sanctuary Brisbane koala"
fetch "$MODERN_DIR/daintree-rainforest.jpg"          "Daintree Rainforest Queensland tropical"
fetch "$MODERN_DIR/fremantle-prison.jpg"             "Fremantle Prison WA heritage"
fetch "$MODERN_DIR/rottnest-island.jpg"              "Rottnest Island Wadjemup beach Western Australia"
fetch "$MODERN_DIR/shark-bay-stromatolites.jpg"      "Hamelin Pool Stromatolites Shark Bay Western Australia"
fetch "$MODERN_DIR/adelaide-oval.jpg"                "Adelaide Oval cricket ground aerial"
fetch "$MODERN_DIR/coober-pedy.jpg"                  "Coober Pedy South Australia opal dugout"
fetch "$MODERN_DIR/naracoorte-caves.jpg"             "Naracoorte Caves Victoria Fossil Cave South Australia"
fetch "$MODERN_DIR/uluru.jpg"                        "Uluru Ayers Rock sunrise red desert Northern Territory"
fetch "$MODERN_DIR/kakadu-national-park.jpg"         "Kakadu National Park rock art Nourlangie"
fetch "$MODERN_DIR/darwin-wwii-heritage.jpg"         "Darwin Northern Territory WWII bombing memorial"
fetch "$MODERN_DIR/australian-war-memorial.jpg"      "Australian War Memorial Canberra exterior"
fetch "$MODERN_DIR/parliament-house-canberra.jpg"    "Parliament House Canberra aerial grassed roof"
fetch "$MODERN_DIR/broken-hill.jpg"                  "Broken Hill New South Wales mining landscape"
fetch "$MODERN_DIR/salamanca-market-hobart.jpg"      "Salamanca Market Hobart sandstone warehouses"
fetch "$MODERN_DIR/gordon-dam-tasmania.jpg"          "Gordon Dam Tasmania Lake Pedder hydro"
fetch "$MODERN_DIR/lamington-national-park.jpg"      "Lamington National Park rainforest Queensland"
fetch "$MODERN_DIR/longreach-stockmans.jpg"          "Australian Stockman Hall of Fame Longreach Queensland"
fetch "$MODERN_DIR/monkey-mia-dolphins.jpg"          "Monkey Mia dolphins Shark Bay Western Australia"
fetch "$MODERN_DIR/the-pinnacles-desert.jpg"         "The Pinnacles Desert Nambung National Park Western Australia"
fetch "$MODERN_DIR/flinders-ranges-wilpena.jpg"      "Wilpena Pound Flinders Ranges South Australia"
fetch "$MODERN_DIR/kangaroo-island.jpg"              "Kangaroo Island Seal Bay sea lions South Australia"
fetch "$MODERN_DIR/katherine-gorge-nitmiluk.jpg"     "Katherine Gorge Nitmiluk Northern Territory"
fetch "$MODERN_DIR/devils-marbles-karlu-karlu.jpg"   "Devils Marbles Karlu Karlu Northern Territory boulders"
fetch "$MODERN_DIR/great-ocean-road.jpg"             "Great Ocean Road Twelve Apostles Victoria"
fetch "$MODERN_DIR/heide-museum-art.jpg"             "Heide Museum of Modern Art Bulleen Melbourne"
fetch "$MODERN_DIR/carnarvon-gorge.jpg"              "Carnarvon Gorge National Park Queensland sandstone"
fetch "$MODERN_DIR/wave-rock-hyden.jpg"              "Wave Rock Hyden Western Australia granite"
fetch "$MODERN_DIR/mount-baw-baw.jpg"                "Victorian High Country alpine mountains Victoria"

echo ""
echo "=== Phase 2: Historical Images ==="

fetch "$HISTORICAL_DIR/old-melbourne-gaol-historical.jpg"        "Old Melbourne Gaol 1880s historical photograph"
fetch "$HISTORICAL_DIR/eureka-centre-ballarat-historical.jpg"    "Eureka Stockade 1854 battle illustration historical"
fetch "$HISTORICAL_DIR/royal-exhibition-building-historical.jpg" "Royal Exhibition Building Melbourne 1880 historical"
fetch "$HISTORICAL_DIR/port-arthur-historical.jpg"               "Port Arthur convict settlement 1870s historical photo"
fetch "$HISTORICAL_DIR/story-bridge-brisbane-historical.jpg"     "Story Bridge Brisbane construction 1930s historical"
fetch "$HISTORICAL_DIR/fremantle-prison-historical.jpg"          "Fremantle Prison gaol 1890s historical photograph"
fetch "$HISTORICAL_DIR/uluru-historical.jpg"                     "Ayers Rock Uluru 1890s early explorer photograph"
fetch "$HISTORICAL_DIR/kakadu-national-park-historical.jpg"      "Kakadu Aboriginal rock art ancient painting"
fetch "$HISTORICAL_DIR/darwin-wwii-heritage-historical.jpg"      "Darwin bombing 1942 WWII World War II photograph"
fetch "$HISTORICAL_DIR/australian-war-memorial-historical.jpg"   "Australian War Memorial opening ceremony 1941 historical"
fetch "$HISTORICAL_DIR/broken-hill-historical.jpg"               "Broken Hill silver mine 1890s historical photograph"
fetch "$HISTORICAL_DIR/great-ocean-road-historical.jpg"          "Great Ocean Road construction workers 1920s historical"
fetch "$HISTORICAL_DIR/coober-pedy-historical.jpg"               "Coober Pedy opal mining 1920s historical photograph"
fetch "$HISTORICAL_DIR/mona-hobart-historical.jpg"               "Berriedale Hobart Tasmania 1960s historical photograph"
fetch "$HISTORICAL_DIR/rottnest-island-historical.jpg"           "Rottnest Island Aboriginal prison 1900s historical"
fetch "$HISTORICAL_DIR/parliament-house-canberra-historical.jpg" "Old Parliament House Canberra 1927 historical opening"

echo ""
echo "=== Summary ==="
echo "✓ Success: $SUCCESS"
echo "✗ Failed:  $FAIL"
echo ""
echo "Modern images downloaded:"
ls "$MODERN_DIR"/*.jpg 2>/dev/null | grep -E "(gaol|eureka|exhibition|port-arthur|mona|story-bridge|lone-pine|daintree|fremantle|rottnest|stromatolite|adelaide-oval|coober|naracoorte|uluru|kakadu|darwin|war-memorial|parliament|broken-hill|salamanca|gordon-dam|lamington|longreach|monkey-mia|pinnacles|flinders|kangaroo-island|katherine|devils-marbles|great-ocean|heide|carnarvon|wave-rock|baw-baw)" | wc -l
echo "Historical images downloaded:"
ls "$HISTORICAL_DIR"/*.jpg 2>/dev/null | grep -vE "(the-rocks|martin-place|qvb|opera|circular|hyde-park|pyrmont|fort-denison|customs|botanic|darling|bondi|manly|newtown|glebe|surry|paddington|balmain|coogee|parramatta|elizabeth|experiment|cadman|argyle|callan|camperdown|admiralty|eveleigh|blues|fortune|australian-museum|art-gallery)" | wc -l
