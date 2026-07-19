#!/bin/bash
# Generate professional product images for all 32 HousePlus products
# Using text_to_image API with SDXL-style prompts

OUTPUT_DIR="/workspace/houseplusgroup-website/public/images/products"
API_URL="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image"

mkdir -p "$OUTPUT_DIR"

# Function to URL-encode a string
urlencode() {
    echo "$1" | jq -sRr @uri
}

# Product prompts: slug|prompt
PRODUCTS=(
  "solar-panel-500w|professional product photo of a 500W monocrystalline solar panel with blue silicon cells and silver aluminum frame, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "solar-inverter-3kw|professional product photo of a 3kW pure sine wave solar inverter, metal casing with LCD display screen and cooling fins, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "lithium-battery-5kwh|professional product photo of a 5kWh LiFePO4 lithium battery pack with black metal casing and BMS display, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "lead-acid-battery-100ah|professional product photo of a 100Ah deep cycle lead-acid battery, black rectangular VRLA AGM battery with terminals on top, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "charge-controller-60a|professional product photo of a 60A MPPT solar charge controller, dark grey metal device with backlit LCD display and heat sink, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "solar-street-light-200w|professional product photo of a 200W all-in-one solar street light, integrated LED lamp with solar panel on top and battery compartment, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "solar-fan-20w|professional product photo of a 20W DC solar fan, wall-mounted ventilation fan with solar panel, grey ABS housing, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "solar-power-bank-20000mah|professional product photo of a 20000mAh solar power bank, black rugged rectangular device with small solar panel and dual USB ports, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "air-fryer-5-8l|professional product photo of a 5.8L digital air fryer, black and stainless steel modern kitchen appliance with digital touch screen, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "induction-cooktop-2000w|professional product photo of a 2000W induction cooktop, black ceramic glass flat surface with digital touch controls, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "electric-kettle-1-5l|professional product photo of a 1.5L stainless steel electric kettle, brushed steel cordless kettle on base, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "toaster-2-slice|professional product photo of a 2-slice stainless steel toaster, brushed metal toaster with two wide slots and browning dial, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "headphone-over-ear|professional product photo of over-ear headphones with microphone, black foldable headset with padded ear cushions and 3.5mm cable, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "bluetooth-earphone-tws|professional product photo of true wireless Bluetooth earphones TWS, white wireless earbuds with charging case open, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "smart-watch|professional product photo of a smart watch with heart rate monitor, black sport smartwatch with 1.7 inch color touchscreen and silicone strap, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "portable-ssd-1tb|professional product photo of a 1TB USB-C portable SSD, small silver aluminium alloy solid state drive, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "micro-sd-128gb|professional product photo of a 128GB micro SD card, small black microSD memory card with SD adapter on white surface, macro shot, clean white background, studio lighting, high detail, e-commerce product photography"
  "usb-c-cable-2m|professional product photo of a 2m USB-C to USB-C fast charging cable, white nylon braided cable with aluminum connectors coiled neatly, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "solar-panel-100w|professional product photo of a 100W monocrystalline solar panel, compact blue silicon cells panel with black frame, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "portable-power-station-3000w|professional product photo of a 3000W portable power station, large grey box with LCD display, AC outlets, USB ports and carrying handle, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "foldable-solar-panel-200w|professional product photo of a 200W foldable solar panel, black folding solar panel with ETFE surface opened showing multiple panels, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "home-energy-storage-5000w|professional product photo of a 5000W home energy storage system, tall white wall-mounted LiFePO4 battery unit with LCD display, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "power-bank-60w-pd|professional product photo of a 60W PD fast charging power bank, silver aluminium alloy 20000mAh power bank with USB-C and USB-A ports, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "lifepo4-battery-12v100ah|professional product photo of a 12V 100Ah LiFePO4 battery, blue or grey rectangular lithium battery with terminals, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "outdoor-power-station-600w|professional product photo of a 600W outdoor power station, compact orange and black portable battery box with LCD screen and USB ports, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "mppt-controller-40a|professional product photo of a 40A MPPT solar charge controller, black device with LCD display and multiple connection terminals, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "magnetic-power-bank-10000mah|professional product photo of a 10000mAh magnetic wireless power bank, slim white rectangular device with MagSafe charging ring, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "pure-sine-inverter-2000w|professional product photo of a 2000W pure sine wave inverter, metal grey box with AC sockets, USB port and cooling fan, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "flexible-solar-panel-400w|professional product photo of a 400W semi-flexible solar panel, thin black bendable solar panel with ETFE surface, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "solar-generator-kit-300w|professional product photo of a 300W portable solar generator kit, compact blue or grey box with solar panel and LED light, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "smart-wifi-plug-meter|professional product photo of a smart WiFi plug with energy meter, white mini smart socket with USB port and LED indicator, front view, clean white background, studio lighting, high detail, e-commerce product photography"
  "usb-c-cable-100w-5a|professional product photo of a 100W 5A USB-C fast charging cable, black braided Type-C cable with aluminum alloy connectors, front view, clean white background, studio lighting, high detail, e-commerce product photography"
)

TOTAL=${#PRODUCTS[@]}
SUCCESS=0
FAILED=0

for entry in "${PRODUCTS[@]}"; do
  slug="${entry%%|*}"
  prompt="${entry##*|}"
  encoded=$(urlencode "$prompt")
  output="$OUTPUT_DIR/${slug}.jpg"

  echo "[$((SUCCESS + FAILED + 1))/$TOTAL] Generating ${slug}..."
  http_code=$(curl -sL "${API_URL}?prompt=${encoded}&image_size=landscape_4_3" -o "$output" -w "%{http_code}")
  size=$(stat -c%s "$output" 2>/dev/null || echo 0)

  if [ "$http_code" = "200" ] && [ "$size" -gt 10000 ]; then
    echo "  OK ($size bytes)"
    SUCCESS=$((SUCCESS + 1))
  else
    echo "  FAILED (HTTP $http_code, $size bytes)"
    FAILED=$((FAILED + 1))
  fi
done

echo ""
echo "=== Generation Complete ==="
echo "Success: $SUCCESS / $TOTAL"
echo "Failed:  $FAILED"
