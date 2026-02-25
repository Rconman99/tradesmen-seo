/**
 * ============================================
 * CITIES CONFIG — Edit per client service area
 * ============================================
 * Each city generates a dedicated landing page.
 * Priority determines build order and internal
 * linking prominence.
 */

export interface City {
  slug: string;
  name: string;
  state: string;
  stateAbbr: string;
  zip: string[];
  population: number;
  priority: "high" | "medium" | "low";
  county: string;
  lat: number;
  lng: number;
  // Unique local content — THIS is what makes each page rank
  localContent: string;
  neighborhoods?: string[];
  nearbyCity?: string[]; // slugs of nearby cities for internal linking
}

export const cities: City[] = [
  // ========================
  // EASTERN WASHINGTON — HIGH
  // ========================
  {
    slug: "spokane-wa",
    name: "Spokane",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["99201", "99202", "99203", "99204", "99205", "99207", "99208", "99210", "99212", "99217", "99223", "99224"],
    population: 228989,
    priority: "high",
    county: "Spokane",
    lat: 47.6588,
    lng: -117.426,
    localContent:
      "Spokane's harsh winters and freeze-thaw cycles take a serious toll on concrete. From the South Hill's steep driveways to the commercial buildings downtown along Riverside Avenue, concrete deterioration is a constant challenge. We've served Spokane homeowners and businesses for over a decade, handling everything from cutting new doorways in basements on the North Side to removing crumbling patios in the Perry District. Our team knows Spokane's soil conditions and building codes inside and out.",
    neighborhoods: [
      "South Hill", "North Side", "Perry District", "Browne's Addition",
      "Garland District", "Lincoln Heights", "Manito", "Comstock",
      "Five Mile", "Indian Trail", "Shadle", "Hillyard",
    ],
    nearbyCity: ["spokane-valley-wa", "liberty-lake-wa", "airway-heights-wa", "cheney-wa"],
  },
  {
    slug: "spokane-valley-wa",
    name: "Spokane Valley",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["99016", "99027", "99037", "99206", "99212", "99216"],
    population: 102976,
    priority: "high",
    county: "Spokane",
    lat: 47.6732,
    lng: -117.2394,
    localContent:
      "Spokane Valley's rapid growth means new construction and remodeling projects everywhere. Along Sprague Avenue and the Sullivan Road corridor, commercial concrete work is in constant demand. Residential neighborhoods throughout the Valley need driveway repairs, patio cuts, and utility access. We're the go-to concrete cutting team for Valley contractors and homeowners alike.",
    neighborhoods: ["Dishman", "Opportunity", "Veradale", "Greenacres", "Trentwood", "Otis Orchards"],
    nearbyCity: ["spokane-wa", "liberty-lake-wa", "post-falls-id"],
  },
  {
    slug: "kennewick-wa",
    name: "Kennewick",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["99336", "99337", "99338"],
    population: 82633,
    priority: "high",
    county: "Benton",
    lat: 46.2112,
    lng: -119.1372,
    localContent:
      "As part of the booming Tri-Cities, Kennewick's construction market is thriving. From the new developments along Columbia Center Boulevard to established neighborhoods near Columbia Park, concrete cutting is essential for renovations and new builds. The region's hot summers and temperature swings create expansion issues that require precise cutting solutions.",
    neighborhoods: ["Southridge", "Canyon Lakes", "West Kennewick", "Columbia Center"],
    nearbyCity: ["pasco-wa", "richland-wa"],
  },
  {
    slug: "yakima-wa",
    name: "Yakima",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98901", "98902", "98903", "98904", "98908"],
    population: 96968,
    priority: "high",
    county: "Yakima",
    lat: 46.6021,
    lng: -120.5059,
    localContent:
      "Yakima's agricultural and commercial hub keeps our concrete cutting crews busy year-round. From warehouse floors on East Nob Hill to residential driveways in West Valley, we handle projects of every size. Yakima's soil conditions and irrigation infrastructure mean utility access cuts and foundation work are common needs for local property owners.",
    neighborhoods: ["West Valley", "Nob Hill", "Terrace Heights", "Selah (nearby)", "Union Gap (nearby)"],
    nearbyCity: ["selah-wa", "sunnyside-wa", "ellensburg-wa"],
  },
  {
    slug: "pasco-wa",
    name: "Pasco",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["99301", "99302"],
    population: 77100,
    priority: "high",
    county: "Franklin",
    lat: 46.2396,
    lng: -119.1006,
    localContent:
      "Pasco is one of the fastest-growing cities in Washington, with new subdivisions and commercial developments popping up constantly. The Road 68 corridor and downtown revitalization projects keep us busy with both new construction cutting and renovation work. Pasco's sandy soil conditions require extra care during foundation and utility cutting projects.",
    neighborhoods: ["Road 68 Corridor", "Downtown", "West Pasco", "Riverview"],
    nearbyCity: ["kennewick-wa", "richland-wa"],
  },
  {
    slug: "richland-wa",
    name: "Richland",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["99352", "99354"],
    population: 60560,
    priority: "high",
    county: "Benton",
    lat: 46.2856,
    lng: -119.2845,
    localContent:
      "Richland's mix of Hanford-related facilities and residential neighborhoods creates steady demand for concrete cutting services. From the Uptown Shopping Center area to the established homes along the Columbia River in the Meadow Springs and Horn Rapids communities, we provide precise cutting for both commercial upgrades and residential renovations.",
    neighborhoods: ["Meadow Springs", "Horn Rapids", "Uptown", "South Richland", "West Richland"],
    nearbyCity: ["kennewick-wa", "pasco-wa"],
  },

  // ========================
  // EASTERN WASHINGTON — MEDIUM
  // ========================
  {
    slug: "walla-walla-wa",
    name: "Walla Walla",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["99362"],
    population: 34060,
    priority: "medium",
    county: "Walla Walla",
    lat: 46.0646,
    lng: -118.343,
    localContent:
      "Walla Walla's wine country boom has transformed the downtown district, with wineries, tasting rooms, and restaurants driving renovation projects. Historic buildings along Main Street often need careful concrete cutting for modern plumbing and electrical access. Residential neighborhoods throughout the city need driveway and patio work, especially as the housing market continues to grow.",
    nearbyCity: ["kennewick-wa"],
  },
  {
    slug: "wenatchee-wa",
    name: "Wenatchee",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98801", "98807"],
    population: 34249,
    priority: "medium",
    county: "Chelan",
    lat: 47.4235,
    lng: -120.3103,
    localContent:
      "Wenatchee, the Apple Capital of the World, has a growing downtown and active construction scene. From commercial projects along Wenatchee Avenue to hillside residential work, our concrete cutting services help local contractors and homeowners keep projects moving. The region's cold winters mean concrete repair and modification work stays steady year-round.",
    nearbyCity: ["east-wenatchee-wa", "chelan-wa", "leavenworth-wa"],
  },
  {
    slug: "moses-lake-wa",
    name: "Moses Lake",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98837"],
    population: 25505,
    priority: "medium",
    county: "Grant",
    lat: 47.1301,
    lng: -119.2781,
    localContent:
      "Moses Lake's role as a regional hub for Grant County means commercial and residential concrete work is always in demand. The growing industrial sector near the Grant County International Airport and new housing developments require professional concrete cutting for utilities, foundations, and access points.",
    nearbyCity: ["ephrata-wa"],
  },
  {
    slug: "ellensburg-wa",
    name: "Ellensburg",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98926"],
    population: 21190,
    priority: "medium",
    county: "Kittitas",
    lat: 46.9965,
    lng: -120.5478,
    localContent:
      "Ellensburg, home to Central Washington University, has a unique mix of historic downtown buildings and university-area construction. The city's extreme temperature swings — blazing summers and cold winters — cause significant concrete stress. We help local property owners with cutting, removal, and repair projects throughout the Kittitas Valley.",
    nearbyCity: ["yakima-wa", "cle-elum-wa"],
  },
  {
    slug: "pullman-wa",
    name: "Pullman",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["99163", "99164"],
    population: 34019,
    priority: "medium",
    county: "Whitman",
    lat: 46.7312,
    lng: -117.1796,
    localContent:
      "Pullman, home to Washington State University, sees constant construction and renovation activity. Student housing developments, university facility upgrades, and commercial growth along Grand Avenue all require professional concrete cutting. Our team serves the entire Palouse region, including nearby Moscow, Idaho.",
    nearbyCity: ["moscow-id"],
  },
  {
    slug: "sunnyside-wa",
    name: "Sunnyside",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98944"],
    population: 17477,
    priority: "medium",
    county: "Yakima",
    lat: 46.3232,
    lng: -120.0084,
    localContent:
      "Sunnyside's agricultural economy drives steady commercial and residential construction. Warehouse concrete work, loading dock modifications, and residential improvements keep our crews active throughout the Lower Yakima Valley.",
    nearbyCity: ["yakima-wa", "grandview-wa", "prosser-wa"],
  },
  {
    slug: "east-wenatchee-wa",
    name: "East Wenatchee",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98802"],
    population: 14709,
    priority: "medium",
    county: "Douglas",
    lat: 47.4187,
    lng: -120.2937,
    localContent:
      "East Wenatchee's hilltop neighborhoods and valley-floor commercial areas both need reliable concrete cutting services. As the city grows, new subdivisions and commercial developments along Grant Road create ongoing demand for precision concrete work.",
    nearbyCity: ["wenatchee-wa"],
  },

  // ========================
  // EASTERN WASHINGTON — LOW
  // ========================
  {
    slug: "cheney-wa",
    name: "Cheney",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["99004"],
    population: 12781,
    priority: "low",
    county: "Spokane",
    lat: 47.4874,
    lng: -117.5758,
    localContent:
      "Cheney, home to Eastern Washington University, benefits from university-related construction and a growing residential community. We provide concrete cutting services for both campus projects and the surrounding residential neighborhoods.",
    nearbyCity: ["spokane-wa", "airway-heights-wa"],
  },
  {
    slug: "liberty-lake-wa",
    name: "Liberty Lake",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["99019"],
    population: 12411,
    priority: "low",
    county: "Spokane",
    lat: 47.6743,
    lng: -117.0842,
    localContent:
      "Liberty Lake's upscale residential communities and growing tech corridor require high-quality concrete cutting for remodeling and commercial build-outs. The Meadowwood Technology Campus area and surrounding neighborhoods are among our regular service areas.",
    nearbyCity: ["spokane-valley-wa", "post-falls-id"],
  },
  {
    slug: "airway-heights-wa",
    name: "Airway Heights",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["99001"],
    population: 10987,
    priority: "low",
    county: "Spokane",
    lat: 47.6446,
    lng: -117.5931,
    localContent:
      "Airway Heights is one of the fastest-growing communities in the Spokane metro area. New commercial developments near Fairchild Air Force Base and rapid residential expansion create constant demand for concrete cutting and removal services.",
    nearbyCity: ["spokane-wa", "cheney-wa"],
  },
  {
    slug: "selah-wa",
    name: "Selah",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98942"],
    population: 8377,
    priority: "low",
    county: "Yakima",
    lat: 46.6541,
    lng: -120.5306,
    localContent:
      "Just north of Yakima, Selah's residential community relies on professional concrete services for home improvements and new construction. We serve Selah as part of our greater Yakima Valley coverage.",
    nearbyCity: ["yakima-wa"],
  },
  {
    slug: "ephrata-wa",
    name: "Ephrata",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98823"],
    population: 8636,
    priority: "low",
    county: "Grant",
    lat: 47.3176,
    lng: -119.5536,
    localContent:
      "Ephrata, the Grant County seat, has a steady need for concrete cutting services in both its commercial district and residential areas. Our crew serves Ephrata and the surrounding Basin communities.",
    nearbyCity: ["moses-lake-wa"],
  },
  {
    slug: "othello-wa",
    name: "Othello",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["99344"],
    population: 8613,
    priority: "low",
    county: "Adams",
    lat: 46.8265,
    lng: -119.1753,
    localContent:
      "Othello's agricultural industry and growing residential areas benefit from reliable concrete cutting services. We travel to Othello and the surrounding Adams County communities for both commercial and residential projects.",
    nearbyCity: ["moses-lake-wa"],
  },
  {
    slug: "grandview-wa",
    name: "Grandview",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98930"],
    population: 11600,
    priority: "low",
    county: "Yakima",
    lat: 46.2507,
    lng: -119.9014,
    localContent:
      "Grandview, in the heart of the Lower Yakima Valley's wine country, sees steady demand for concrete work in both its growing residential neighborhoods and commercial agricultural facilities.",
    nearbyCity: ["sunnyside-wa", "prosser-wa"],
  },
  {
    slug: "prosser-wa",
    name: "Prosser",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["99350"],
    population: 6400,
    priority: "low",
    county: "Benton",
    lat: 46.2068,
    lng: -119.7688,
    localContent:
      "Prosser's wine industry growth and residential expansion drive demand for concrete cutting services. From winery construction to residential improvements, we serve the Prosser community.",
    nearbyCity: ["grandview-wa", "kennewick-wa"],
  },
  {
    slug: "chelan-wa",
    name: "Chelan",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98816"],
    population: 4386,
    priority: "low",
    county: "Chelan",
    lat: 47.841,
    lng: -119.9962,
    localContent:
      "Lake Chelan's resort community and vacation home market create seasonal demand for concrete cutting services. We handle dock work, patio modifications, and residential projects throughout the Chelan area.",
    nearbyCity: ["wenatchee-wa"],
  },
  {
    slug: "leavenworth-wa",
    name: "Leavenworth",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98826"],
    population: 2148,
    priority: "low",
    county: "Chelan",
    lat: 47.5962,
    lng: -120.6615,
    localContent:
      "Leavenworth's Bavarian village tourism drives commercial renovation projects year-round. The unique building requirements and historic character of the downtown area require careful, precise concrete work.",
    nearbyCity: ["wenatchee-wa"],
  },
  {
    slug: "cle-elum-wa",
    name: "Cle Elum",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98922"],
    population: 2124,
    priority: "low",
    county: "Kittitas",
    lat: 47.1954,
    lng: -120.9393,
    localContent:
      "Cle Elum's mountain resort developments and growing residential community need concrete cutting services for new construction and renovation projects in the upper Kittitas County area.",
    nearbyCity: ["ellensburg-wa"],
  },
  {
    slug: "omak-wa",
    name: "Omak",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98841"],
    population: 5044,
    priority: "low",
    county: "Okanogan",
    lat: 48.411,
    lng: -119.5275,
    localContent:
      "Omak and the Okanogan Valley have a steady need for concrete services. We travel to Omak for both commercial and residential cutting and removal projects.",
    nearbyCity: [],
  },
  {
    slug: "colville-wa",
    name: "Colville",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["99114"],
    population: 5022,
    priority: "low",
    county: "Stevens",
    lat: 48.5466,
    lng: -117.9053,
    localContent:
      "Colville, the hub of Stevens County, relies on traveling concrete cutting professionals for both residential and commercial projects. We service Colville and the surrounding northeastern Washington communities.",
    nearbyCity: [],
  },
  {
    slug: "toppenish-wa",
    name: "Toppenish",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98948"],
    population: 9026,
    priority: "low",
    county: "Yakima",
    lat: 46.3777,
    lng: -120.3103,
    localContent:
      "Toppenish, known for its murals and Yakama Nation heritage, has growing concrete service needs in both residential areas and agricultural facilities throughout the central Yakima Valley.",
    nearbyCity: ["yakima-wa", "sunnyside-wa"],
  },

  // ========================
  // NORTHERN IDAHO — HIGH
  // ========================
  {
    slug: "coeur-dalene-id",
    name: "Coeur d'Alene",
    state: "Idaho",
    stateAbbr: "ID",
    zip: ["83814", "83815"],
    population: 53568,
    priority: "high",
    county: "Kootenai",
    lat: 47.6777,
    lng: -116.7805,
    localContent:
      "Coeur d'Alene's booming real estate market and lakeside tourism economy create constant demand for concrete cutting services. From the upscale homes along the lake to commercial renovations downtown on Sherman Avenue, our team handles projects throughout the CdA area. The region's cold winters and heavy snowfall mean concrete repair and cutting work stays busy year-round.",
    neighborhoods: ["Downtown", "Midtown", "Sanders Beach", "Fernan", "Best Hill", "Prairie Avenue Corridor"],
    nearbyCity: ["post-falls-id", "hayden-id", "rathdrum-id"],
  },
  {
    slug: "post-falls-id",
    name: "Post Falls",
    state: "Idaho",
    stateAbbr: "ID",
    zip: ["83854", "83877"],
    population: 38926,
    priority: "high",
    county: "Kootenai",
    lat: 47.718,
    lng: -116.9516,
    localContent:
      "Post Falls is one of Idaho's fastest-growing cities, with new subdivisions, shopping centers, and industrial parks going up constantly. The Riverbend Commerce Park area and expanding residential developments along Seltice Way keep our crews busy with new construction cutting and renovation work.",
    nearbyCity: ["coeur-dalene-id", "spokane-valley-wa", "liberty-lake-wa", "rathdrum-id"],
  },
  {
    slug: "lewiston-id",
    name: "Lewiston",
    state: "Idaho",
    stateAbbr: "ID",
    zip: ["83501"],
    population: 33810,
    priority: "high",
    county: "Nez Perce",
    lat: 46.4165,
    lng: -117.0177,
    localContent:
      "Lewiston, at the confluence of the Snake and Clearwater Rivers, has a diverse economy driving steady concrete work demand. From the Orchards commercial district to the established neighborhoods along Normal Hill, we provide concrete cutting for renovations, utility access, and new construction throughout the Lewis-Clark Valley.",
    nearbyCity: ["moscow-id", "pullman-wa"],
  },

  // ========================
  // NORTHERN IDAHO — MEDIUM
  // ========================
  {
    slug: "moscow-id",
    name: "Moscow",
    state: "Idaho",
    stateAbbr: "ID",
    zip: ["83843", "83844"],
    population: 26223,
    priority: "medium",
    county: "Latah",
    lat: 46.7324,
    lng: -117.0002,
    localContent:
      "Moscow, home to the University of Idaho, combines college-town charm with active construction. University projects, student housing developments, and the vibrant downtown along Main Street all create demand for professional concrete cutting services in the Palouse region.",
    nearbyCity: ["pullman-wa", "lewiston-id"],
  },
  {
    slug: "hayden-id",
    name: "Hayden",
    state: "Idaho",
    stateAbbr: "ID",
    zip: ["83835"],
    population: 16569,
    priority: "medium",
    county: "Kootenai",
    lat: 47.766,
    lng: -116.7866,
    localContent:
      "Hayden's growth as a residential community north of Coeur d'Alene means new homes, commercial development along Highway 95, and ongoing renovation projects. We serve Hayden and Hayden Lake with the full range of concrete cutting services.",
    nearbyCity: ["coeur-dalene-id", "rathdrum-id"],
  },
  {
    slug: "sandpoint-id",
    name: "Sandpoint",
    state: "Idaho",
    stateAbbr: "ID",
    zip: ["83864"],
    population: 9200,
    priority: "medium",
    county: "Bonner",
    lat: 48.2766,
    lng: -116.5533,
    localContent:
      "Sandpoint's resort-town atmosphere on Lake Pend Oreille drives both residential and commercial concrete work. From vacation homes and condos to downtown commercial renovations, we serve the greater Sandpoint area including Ponderay and Sagle.",
    nearbyCity: ["bonners-ferry-id", "priest-river-id"],
  },
  {
    slug: "rathdrum-id",
    name: "Rathdrum",
    state: "Idaho",
    stateAbbr: "ID",
    zip: ["83858"],
    population: 9629,
    priority: "medium",
    county: "Kootenai",
    lat: 47.8124,
    lng: -116.8933,
    localContent:
      "Rathdrum's rapid residential growth as a Kootenai County bedroom community creates ongoing demand for concrete cutting in new construction and home improvement projects.",
    nearbyCity: ["coeur-dalene-id", "hayden-id", "post-falls-id"],
  },

  // ========================
  // NORTHERN IDAHO — LOW
  // ========================
  {
    slug: "bonners-ferry-id",
    name: "Bonners Ferry",
    state: "Idaho",
    stateAbbr: "ID",
    zip: ["83805"],
    population: 2719,
    priority: "low",
    county: "Boundary",
    lat: 48.6916,
    lng: -116.3163,
    localContent:
      "Bonners Ferry, the Boundary County seat near the Canadian border, has a small but steady demand for concrete cutting services. We travel to Bonners Ferry for both residential and commercial projects.",
    nearbyCity: ["sandpoint-id"],
  },
  {
    slug: "orofino-id",
    name: "Orofino",
    state: "Idaho",
    stateAbbr: "ID",
    zip: ["83544"],
    population: 3070,
    priority: "low",
    county: "Clearwater",
    lat: 46.4793,
    lng: -116.2552,
    localContent:
      "Orofino's timber industry and residential community along the Clearwater River create periodic demand for concrete cutting and removal services. We serve the greater Orofino area.",
    nearbyCity: ["lewiston-id"],
  },
  {
    slug: "grangeville-id",
    name: "Grangeville",
    state: "Idaho",
    stateAbbr: "ID",
    zip: ["83530"],
    population: 3198,
    priority: "low",
    county: "Idaho",
    lat: 45.9266,
    lng: -116.1219,
    localContent:
      "Grangeville, the gateway to the Salmon River and Gospel Hump Wilderness, has a small-town economy with steady concrete service needs. We serve Grangeville and surrounding Idaho County communities.",
    nearbyCity: ["lewiston-id"],
  },
  {
    slug: "spirit-lake-id",
    name: "Spirit Lake",
    state: "Idaho",
    stateAbbr: "ID",
    zip: ["83869"],
    population: 2374,
    priority: "low",
    county: "Kootenai",
    lat: 47.9666,
    lng: -116.8675,
    localContent:
      "Spirit Lake's lakeside community and surrounding rural properties need reliable concrete cutting services. We cover Spirit Lake as part of our greater Kootenai County service area.",
    nearbyCity: ["rathdrum-id", "hayden-id"],
  },
  {
    slug: "priest-river-id",
    name: "Priest River",
    state: "Idaho",
    stateAbbr: "ID",
    zip: ["83856"],
    population: 2076,
    priority: "low",
    county: "Bonner",
    lat: 48.18,
    lng: -116.9066,
    localContent:
      "Priest River, situated between Coeur d'Alene and Sandpoint, serves as a hub for surrounding Bonner County communities. We provide concrete cutting services throughout the Priest River area.",
    nearbyCity: ["sandpoint-id", "rathdrum-id"],
  },
  {
    slug: "kellogg-id",
    name: "Kellogg",
    state: "Idaho",
    stateAbbr: "ID",
    zip: ["83837"],
    population: 2120,
    priority: "low",
    county: "Shoshone",
    lat: 47.5282,
    lng: -116.1191,
    localContent:
      "Kellogg, home to Silver Mountain Resort in the Silver Valley, has seen a tourism-driven revival. Resort area construction, residential improvements, and commercial renovations create demand for concrete cutting in the historic mining town.",
    nearbyCity: ["coeur-dalene-id"],
  },
  {
    slug: "wallace-id",
    name: "Wallace",
    state: "Idaho",
    stateAbbr: "ID",
    zip: ["83873"],
    population: 784,
    priority: "low",
    county: "Shoshone",
    lat: 47.4741,
    lng: -115.9278,
    localContent:
      "Wallace, the historic Silver Valley mining town listed on the National Register of Historic Places, requires careful concrete work that respects its heritage buildings. We provide precision cutting for renovation and restoration projects.",
    nearbyCity: ["kellogg-id"],
  },
  {
    slug: "st-maries-id",
    name: "St. Maries",
    state: "Idaho",
    stateAbbr: "ID",
    zip: ["83861"],
    population: 2523,
    priority: "low",
    county: "Benewah",
    lat: 47.3146,
    lng: -116.5625,
    localContent:
      "St. Maries, along the St. Joe River, serves as the hub for Benewah County. The timber-based economy and residential community create periodic demand for concrete cutting services.",
    nearbyCity: ["coeur-dalene-id"],
  },
];

// Helper functions
export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getCitiesByPriority(priority: City["priority"]): City[] {
  return cities.filter((c) => c.priority === priority);
}

export function getCitiesByState(stateAbbr: string): City[] {
  return cities.filter((c) => c.stateAbbr === stateAbbr);
}

export function getNearbyCities(city: City): City[] {
  return (city.nearbyCity || [])
    .map((slug) => getCityBySlug(slug))
    .filter((c): c is City => c !== undefined);
}
