/**
 * ============================================
 * CITIES CONFIG — Taylor Creek Excavation & Concrete
 * ============================================
 * King County + Pierce County, Washington.
 * Each city generates a dedicated service-area page.
 * Priority determines build order and internal
 * linking prominence.
 *
 * CONTENT STRATEGY:
 * Each localContent field contains 430+ unique words
 * organized into 6 content blocks:
 *   1. Local Geography & Soils (glacial till, drainage)
 *   2. Permits & Regulations (city authority, grading, critical areas)
 *   3. Neighborhood Guide
 *   4. Local Pricing Context (hedged ranges, no promises)
 *   5. Common Local Issues
 *   6. Why Local Experience Matters (dual-trade)
 *
 * This ensures strong content differentiation between
 * city pages and keeps claims defensible and accurate to
 * the Puget Sound region.
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
  // KING COUNTY
  // ========================
  {
    slug: "maple-valley-wa",
    name: "Maple Valley",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98038"],
    population: 28000,
    priority: "high",
    county: "King",
    lat: 47.3923,
    lng: -122.0487,
    localContent: `Maple Valley sits in the Puget Sound lowland between the Cedar River and Lake Wilderness, and like much of southeast King County its ground was shaped by the last glaciation. Many lots here sit over Vashon glacial till, the dense, cement-like layer locals call hardpan, often capped by Alderwood gravelly sandy loam. That combination matters on every job: hardpan resists digging and sheds water rather than absorbing it, while the looser upper soils can hold moisture. Scattered pockets of poorly drained clay and seasonally high winter water tables are common, so excavation, grading, subgrade preparation, and compaction all have to account for soil that behaves very differently in August than it does in February. Concrete placed over properly compacted, well-drained subgrade tends to perform far better than slabs poured on saturated or loosely filled ground.

Work in Maple Valley typically runs through the City of Maple Valley, which issues clearing and grading permits and applies critical-areas ordinances covering erosion and landslide hazard areas, wetlands, and streams near the Cedar River corridor. Stormwater handling generally follows the Washington Department of Ecology's Stormwater Management Manual for Western Washington. Driveway approaches that touch a public street usually require a right-of-way permit. One advantage of building in this region is that frost depth is shallow, roughly twelve to eighteen inches, so footings and foundations are designed for those conditions rather than the deep frost lines seen in colder states.

The neighborhoods around town each bring their own ground conditions. Lake Wilderness and Cherokee Bay sit close to water, where drainage retrofits and footing-drain work are often the priority. Summit Place, Wilderness Village, and Hunter's Glen include newer plats where site prep, lot grading, and driveway pours are common, while Rock Creek properties frequently involve managing runoff across sloping lots. Tying excavation and concrete together on the same site tends to produce cleaner grades and better long-term drainage.

Pricing for this kind of work varies widely and should always be quoted after a site visit. A residential concrete driveway, a footing or French-drain installation, and lot grading or general site prep can each land in very different ranges depending on access, soil conditions, slope, and overall scope. Hardpan, tight access, or high water tables can all push a project up, so any figure should be treated as rough context rather than a promise.

Many local issues trace back to water. Wet or standing yards, failing or absent footing drains, slabs that settle and crack over poorly compacted fill, and runoff spilling onto neighboring lots are all common around Maple Valley. Sloped properties may need retaining walls or rockeries, and tree-root or stump removal often comes up before site prep can begin. Wet basements and crawlspaces frequently call for regrading.

Because Maple Valley is home base, Taylor Creek knows the city's permit process and local soils firsthand. Having one crew handle both the excavation and site prep and the concrete means fewer contractors to coordinate and better continuity from grading to finished pour.`,
    neighborhoods: [
      "Lake Wilderness",
      "Summit Place",
      "Wilderness Village",
      "Rock Creek",
      "Cherokee Bay",
      "Hunter's Glen",
    ],
    nearbyCity: ["covington-wa", "black-diamond-wa"],
  },
  {
    slug: "covington-wa",
    name: "Covington",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98042"],
    population: 21000,
    priority: "high",
    county: "King",
    lat: 47.3596,
    lng: -122.1218,
    localContent: `Covington lies in the Puget Sound lowland of King County, near the Jenkins Creek and Pipe Lake area and not far from Lake Sawyer. Its soils reflect the region's glacial past: many properties sit over Vashon glacial till, the dense hardpan that resists digging and sheds water, often topped by Alderwood gravelly sandy loam. Pockets of poorly drained clay and high winter water tables are common, especially in the lower ground near creeks and lakes. For excavation and grading, that means subgrade preparation and compaction have to be matched to the soil at hand, and drainage planning is rarely optional. Concrete poured over well-compacted, properly drained subgrade tends to hold up, while slabs placed on saturated or loose fill are far more likely to move and crack over time.

Most projects in Covington go through the City of Covington for permitting. Clearing and grading permits are typically required, and critical-areas ordinances apply to erosion and landslide hazard areas, wetlands, and the streams that thread through town such as Jenkins Creek. Stormwater is generally governed by the Washington Department of Ecology's Stormwater Management Manual for Western Washington. A right-of-way permit is usually needed for driveway approaches connecting to a public road. Because Puget-lowland frost depth is shallow, around twelve to eighteen inches, footings and foundations are designed accordingly rather than for deep frost.

Covington's neighborhoods vary in age and ground conditions. Covington Estates and Timberlane include established areas where drainage retrofits and footing-drain upgrades are often the focus, while the Wax Road corridor mixes older and newer development. Properties around Jenkins Creek and Pipe Lake sit near water, so managing runoff and protecting footings matters there, and newer plats frequently need fresh site prep, lot grading, and driveway pours.

Pricing depends heavily on the specifics of each site. A residential concrete driveway, a footing or French-drain install, and lot grading or site prep can each fall into quite different ranges based on access, soil, slope, and scope. Tight lots, hardpan, or a high water table can all add cost, so any number shared early is best treated as general context, not a fixed quote until the site has been walked.

The issues that come up most often here involve water. Wet or standing yards, failing or missing footing drains, settling and cracked slabs over poorly compacted fill, and drainage that runs onto a neighbor's property are all familiar around Covington. Sloped lots may call for retaining walls or rockeries, tree-root and stump removal often precedes site prep, and wet basements or crawlspaces commonly need regrading to dry out.

Local experience pays off here. Taylor Creek's familiarity with Covington's permit process and its glacial soils helps projects move more smoothly, and having one crew handle both the excavation and site prep and the concrete means fewer contractors to coordinate and a cleaner transition from dirt work to finished slab.`,
    neighborhoods: [
      "Timberlane",
      "Jenkins Creek",
      "Covington Estates",
      "Pipe Lake",
      "Wax Road",
    ],
    nearbyCity: ["maple-valley-wa", "kent-wa"],
  },
  {
    slug: "kent-wa",
    name: "Kent",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98030", "98031", "98032", "98042"],
    population: 136000,
    priority: "high",
    county: "King",
    lat: 47.3809,
    lng: -122.2348,
    localContent: `Kent spans two very different kinds of ground, which makes it one of the more varied places to work in King County. Down on the Kent Valley floor, the Green River valley, soils are soft alluvial deposits with a high water table, and some of the made ground near the valley floor is liquefaction-prone fill. Up on East Hill and West Hill, by contrast, the ground is glacial: Vashon till hardpan and Alderwood gravelly sandy loam, with scattered pockets of poorly drained clay and high winter water tables. That split shapes everything. Excavation, grading, subgrade prep, and compaction in the valley demand careful attention to wet, weak soils, while hillside work contends with dense, slow-draining till. In both settings, concrete performs best over subgrade that has been properly compacted and drained.

Permitting in Kent generally runs through the City of Kent. Clearing and grading permits are commonly required, and critical-areas ordinances apply to erosion and landslide hazard areas, wetlands, and streams, which is especially relevant along the river valley and on the hillside slopes. Stormwater handling typically follows the Washington Department of Ecology's Stormwater Management Manual for Western Washington. Driveway approaches onto public streets usually need a right-of-way permit. Frost depth in the Puget lowland is shallow, roughly twelve to eighteen inches, so footings and foundations are designed for those conditions; the bigger geotechnical concern in the valley is soft and potentially liquefiable soil rather than frost.

Kent's neighborhoods reflect this geography. East Hill, West Hill, and the Meridian and Panther Lake areas sit largely on glacial uplands where site prep, lot grading, and driveway work are common, and older sections often need drainage retrofits. The Kent Valley floor, with its soft alluvium, calls for extra care during excavation and subgrade preparation before any concrete is placed.

Pricing varies considerably across Kent precisely because the ground does. A residential concrete driveway, a footing or French-drain install, and lot grading or site prep can each land in very different ranges depending on whether the lot is on the hill or in the valley, plus access, slope, and scope. Soft valley soils or hillside hardpan can both affect cost, so any early figure should be read as rough context rather than a promise.

Common local problems include wet or standing yards, failing or absent footing drains, and slabs that settle and crack over poorly compacted fill, an issue made worse by the valley's weak soils. Drainage onto neighboring lots, retaining walls or rockeries on the hillsides, tree-root and stump removal, and regrading for wet basements and crawlspaces all come up regularly.

Knowing how Kent's permit process works and how its valley and hillside soils behave makes a real difference. Taylor Creek brings that local familiarity, and running one crew for both the excavation and site prep and the concrete means fewer contractors to coordinate and a smoother handoff from earthwork to finished pour.`,
    neighborhoods: ["East Hill", "West Hill", "Panther Lake", "Meridian", "Kent Valley"],
    nearbyCity: ["covington-wa", "renton-wa"],
  },
  {
    slug: "auburn-wa",
    name: "Auburn",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98001", "98002", "98092"],
    population: 87000,
    priority: "high",
    county: "King",
    lat: 47.3073,
    lng: -122.2285,
    localContent: `Auburn sits mostly in King County, with a small portion reaching into Pierce County, at the confluence of the Green and White River valleys. Like Kent, it carries two distinct soil stories. The valley floor holds soft alluvial soils laid down by the rivers, often with a high water table, while the plateaus at Lea Hill and Lakeland Hills rise onto glacial-till uplands of dense Vashon hardpan and Alderwood gravelly sandy loam. Pockets of poorly drained clay and high winter water tables show up across both. For excavation and grading, the alluvial valley demands careful work over weak, wet ground, while the till plateaus mean digging through hardpan that drains slowly. Subgrade preparation and compaction have to suit whichever soil is present, and concrete consistently does better when it is poured over well-compacted, well-drained subgrade.

Permits in Auburn generally go through the City of Auburn. Clearing and grading permits are commonly required, and critical-areas ordinances govern erosion and landslide hazard areas, wetlands, and the streams and rivers that define the valley. Stormwater is typically handled under the Washington Department of Ecology's Stormwater Management Manual for Western Washington, and a right-of-way permit is usually needed for driveway approaches onto public streets. Puget-lowland frost depth is shallow, around twelve to eighteen inches, so footings and foundations are designed for that; in the valley, soft soils are a bigger design factor than frost.

The neighborhoods spread across both landscapes. Lea Hill, Lakeland Hills, West Hill, and the broader Plateau sit on glacial uplands where new-construction site prep, lot grading, and driveway pours are common and older areas may need drainage retrofits. Auburn Valley properties, down on the alluvium, often need extra attention to drainage and subgrade before concrete goes in.

Pricing reflects this range. A residential concrete driveway, a footing or French-drain install, and lot grading or site prep can each fall into quite different ranges depending on whether a lot is on the plateau or the valley floor, along with access, slope, and scope. Soft valley soils, hillside hardpan, or limited access can all influence cost, so any early number is best treated as general context until the site is evaluated.

Water drives many of the local issues here. Wet or standing yards, failing or absent footing drains, and slabs that settle and crack over poorly compacted fill are all common, particularly where weak valley soils are involved. Drainage onto neighboring lots, retaining walls and rockeries on the hillside plateaus, tree-root and stump removal ahead of site prep, and regrading for wet basements and crawlspaces all come up regularly.

Understanding Auburn's permit process and the contrast between its valley alluvium and plateau till makes the work go more smoothly. Taylor Creek brings that local familiarity, and having one crew carry a project through both the excavation and site prep and the concrete means fewer contractors to coordinate and a cleaner transition from earthwork to finished slab.`,
    neighborhoods: ["Lea Hill", "Lakeland Hills", "West Hill", "Auburn Valley", "Plateau"],
    nearbyCity: ["kent-wa", "federal-way-wa"],
  },
  {
    slug: "renton-wa",
    name: "Renton",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98055", "98056", "98057", "98058", "98059"],
    population: 106000,
    priority: "high",
    county: "King",
    lat: 47.4829,
    lng: -122.2171,
    localContent: `Renton sits where the Puget Sound lowland folds up against the Cedar River valley and the old Black River channel, and the ground here reflects that glacial history. Across much of the city you find Vashon glacial till, the dense gray "hardpan" left by the last ice sheet, which compacts well for subgrade but sheds water rather than absorbing it. Above and beside the till are bands of Alderwood gravelly sandy loam, and in the low flats near the rivers you encounter pockets of poorly drained clay and seasonally high winter water tables. For excavation, that mix means a backhoe can hit refusal on hardpan one day and slop through saturated clay the next, so grading and subgrade prep have to be planned site by site. Proper compaction and a clean, free-draining base layer are what keep a concrete slab or driveway from settling once Renton's wet season sets in.

Work in Renton is reviewed by the City of Renton, which administers clearing and grading permits and enforces a critical-areas ordinance covering erosion and landslide hazard areas, wetlands, and streams. The Renton Highlands and Talbot Hill both include mapped steep slopes where erosion-control and geotechnical review are often required before dirt moves. Stormwater design generally follows the Washington Department of Ecology's Stormwater Management Manual for Western Washington, so flow control and runoff treatment frequently shape how a site is graded. A right-of-way permit is typically needed for a new or rebuilt driveway approach. Because Puget-lowland frost depth is shallow, often roughly 12 to 18 inches, footings and foundations here are designed for that modest depth rather than the deep frost lines of colder regions.

The neighborhoods tell the story of the terrain. In the Highlands and on Talbot Hill, hillside lots often call for cut-and-fill grading, retaining walls, and careful drainage routing. Kennydale's slopes down toward Lake Washington raise similar concerns, while Benson Hill and Fairwood subdivisions tend toward fuller lots where driveway, patio, and footing-drain work are common. Properties near the Cedar River corridor sit on softer valley soils where subgrade prep and slab support deserve extra attention.

For pricing, it helps to think in ranges rather than fixed numbers. A residential concrete driveway, a footing or French-drain installation, and lot grading or site prep each vary widely with access, soil conditions, and scope, so an on-site look is the only honest way to scope a job. We never promise a price sight unseen.

Common local issues echo across Renton: wet or standing yards, failing or missing footing drains, slabs that crack after settling over poorly compacted fill, runoff spilling onto a neighbor's lot, and rockeries or retaining walls strained on hillside ground. Tree-root and stump removal and regrading around wet basements and crawlspaces come up often, too.

Familiarity with Renton's permit process and its varied glacial soils makes these projects go smoother, and having one Taylor Creek crew handle both the excavation and site prep and the concrete keeps the grading and the pour aligned from start to finish.`,
    neighborhoods: [
      "Highlands",
      "Talbot Hill",
      "Kennydale",
      "Benson Hill",
      "Cedar River",
      "Fairwood",
    ],
    nearbyCity: ["kent-wa", "maple-valley-wa"],
  },
  {
    slug: "federal-way-wa",
    name: "Federal Way",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98003", "98023", "98093"],
    population: 101000,
    priority: "high",
    county: "King",
    lat: 47.3223,
    lng: -122.3126,
    localContent: `Federal Way occupies a broad glacial plateau between Puget Sound and the Green River valley, and that flat-to-rolling tableland is dotted with wetlands and small lakes, including Steel Lake, North Lake, and Mirror Lake. Beneath the surface you commonly find Alderwood gravelly sandy loam over dense Vashon glacial till, the gray hardpan that drains slowly and perches water above it. Add in pockets of poorly drained clay and high winter water tables near the lakes and wetlands, and you have ground that can be firm where the till is shallow yet soggy a short distance away. For excavation, that means subgrade prep and compaction have to be matched to what the ground actually does on a given lot, and grading often has to move water deliberately rather than assume it will soak away. A clean, well-compacted base is what keeps a concrete driveway or slab stable through the wet months.

Projects in Federal Way are reviewed by the City of Federal Way, which issues clearing and grading permits and applies a critical-areas ordinance protecting wetlands, streams, and erosion and landslide hazard areas, all of which are plentiful on this lake-studded plateau. Stormwater handling generally follows the Washington Department of Ecology's Stormwater Management Manual for Western Washington, so runoff control and treatment frequently drive how a site is shaped and where water is routed. A right-of-way permit is typically required for a driveway approach onto a public street. Frost depth in the Puget lowland is shallow, often around 12 to 18 inches, so footings and foundations here are designed for that modest depth rather than the deeper frost lines seen inland.

The neighborhoods reflect the wet plateau. Twin Lakes and the Lakeland area sit among small water bodies where footing drains and yard drainage matter a great deal, while Steel Lake and Mirror Lake properties often need careful grading to keep runoff in check. Redondo's slope toward the Sound and Dash Point's wooded terrain bring cut, fill, and retaining considerations into driveway and patio work.

On pricing, ranges are the honest way to talk. A residential concrete driveway, a footing or French-drain install, and lot grading or site prep each shift with access, soil, and scope, so the only reliable estimate comes after seeing the site. We do not quote a fixed figure blind.

The recurring problems here are familiar: wet or standing yards, footing drains that have failed or were never installed, slabs cracking over poorly compacted fill, drainage spilling onto neighboring lots, and retaining walls or rockeries on sloping ground. Tree-root and stump removal and regrading to dry out wet basements and crawlspaces are common requests as well.

Knowing how Federal Way's permit process and its plateau soils behave makes the difference, and having a single Taylor Creek crew handle both excavation and site prep and the concrete keeps the grading and the finished pour working together instead of at cross purposes.`,
    neighborhoods: [
      "Twin Lakes",
      "Steel Lake",
      "Lakeland",
      "Redondo",
      "Mirror Lake",
      "Dash Point",
    ],
    nearbyCity: ["auburn-wa", "tacoma-wa"],
  },
  {
    slug: "black-diamond-wa",
    name: "Black Diamond",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98010"],
    population: 4500,
    priority: "medium",
    county: "King",
    lat: 47.3087,
    lng: -122.0001,
    localContent: `Black Diamond sits in the foothills southeast of the main Puget Sound lowland, a former coal-mining town where the terrain turns steeper and more rural than the flatter cities to the west. The glacial signature is still here, with Vashon glacial till, the dense gray hardpan, underlying much of the higher ground and Alderwood gravelly sandy loam common on the gentler slopes. In the lower draws and near Lake Sawyer you find pockets of poorly drained clay and high winter water tables, while the old mining landscape adds variable fill and uneven subgrade in places. For excavation, that combination means a crew has to read each lot carefully, since hardpan, loose fill, and saturated clay can all appear on the same property. Thoughtful grading, solid compaction, and a free-draining base are what keep a concrete slab or driveway from settling or cracking once the foothill rains arrive.

Work in Black Diamond is reviewed by the City of Black Diamond, which administers clearing and grading permits and enforces a critical-areas ordinance covering erosion and landslide hazard areas, wetlands, and streams, all of which are relevant on this hilly, wooded terrain. Stormwater design generally follows the Washington Department of Ecology's Stormwater Management Manual for Western Washington, so flow control and runoff treatment often shape how a site is graded and where water is directed. A right-of-way permit is typically needed for a driveway approach onto a public road. Puget-lowland frost depth is shallow, often roughly 12 to 18 inches, so footings and foundations are designed accordingly rather than for deep frost lines.

The area's character shows in its neighborhoods. The Lake Sawyer shoreline and the Pipe Lake area bring lakeside drainage and slope concerns, while the large, newer Ten Trails master-planned community generates steady demand for site prep, lot grading, and driveway and foundation work as homes go in. The Black Diamond historic core and the Morganville area sit on older, sometimes irregular ground where subgrade conditions deserve a close look before any pour.

On pricing, ranges are the only honest frame. A residential concrete driveway, a footing or French-drain install, and lot grading or site prep each vary with access, soil, and scope, and steeper rural lots can add complexity, so an on-site assessment is essential. We never commit to a price sight unseen.

Common issues track the terrain: wet or standing yards, failing or absent footing drains, slabs settling over poorly compacted fill, runoff crossing onto neighboring lots, and retaining walls or rockeries holding back sloped ground. Tree-root and stump removal and regrading to address wet basements and crawlspaces come up frequently in this wooded foothill setting.

Understanding Black Diamond's permit process and its mix of foothill and former-mining soils pays off, and having one Taylor Creek crew handle both the excavation and site prep and the concrete keeps grading and pour coordinated from the first cut to the final finish.`,
    neighborhoods: [
      "Lake Sawyer",
      "Ten Trails",
      "Black Diamond Historic",
      "Morganville",
      "Pipe Lake",
    ],
    nearbyCity: ["maple-valley-wa", "covington-wa"],
  },

  // ========================
  // PIERCE COUNTY
  // ========================
  {
    slug: "tacoma-wa",
    name: "Tacoma",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98402", "98404", "98405", "98406", "98408", "98409"],
    population: 220000,
    priority: "high",
    county: "Pierce",
    lat: 47.2529,
    lng: -122.4443,
    localContent: `Tacoma sits on the Puget Sound lowland above Commencement Bay, and the ground beneath it reflects its glacial past. Much of the city rests on Vashon glacial till, the dense gray hardpan left by the last ice sheet, often capped by Alderwood gravelly sandy loam. This till is firm to dig but nearly impermeable, so water tends to perch on top of it rather than soak away, and many lots carry high winter water tables. Toward the bay the terrain breaks into ravines, gulches, and steep slopes, while the tideflats are largely engineered fill placed over soft estuarine deposits. For excavation and concrete this means subgrade prep is critical: loose or organic soils often need to be removed and replaced with compacted structural fill so slabs and footings bear evenly, and drainage has to be planned from the start.

Most ground-disturbing projects in Tacoma fall under the City of Tacoma Planning and Development Services, which issues clearing and grading permits and reviews work against critical-areas ordinances covering erosion and landslide hazard areas, wetlands, and streams. On the slopes above Commencement Bay these reviews are often more involved, since geologic hazard areas can require added engineering and erosion control. Stormwater design typically follows the Washington Department of Ecology Stormwater Management Manual for Western Washington. A new or widened driveway approach usually needs a right-of-way permit for work in the public right-of-way. Because Puget-lowland frost depth is shallow, generally around twelve to eighteen inches, footings and foundations are designed for that condition, so bearing soil and drainage matter more than frost protection.

Tacoma neighborhoods each bring their own ground conditions. The North End and Proctor are full of established homes where driveway replacements, footing drains, and crawlspace regrades are common. Stadium District sits on bluffs where retaining and drainage work is frequent. Hilltop mixes older lots and infill where site prep and new flatwork go hand in hand, while South Tacoma tends to be flatter with deeper till. Northeast Tacoma, perched above the tideflats, often involves slope-aware grading near sensitive areas.

Pricing always depends on the specifics, but it helps to think in ranges. A residential concrete driveway can vary widely with size, thickness, access, and how much the subgrade needs reworking. A footing or French-drain installation depends on trench length, depth, and where the water can be routed. Lot grading and site prep scale with slope, soil, and how much material has to be moved or imported. Taylor Creek scopes each job on site rather than promising a number sight unseen.

Common local issues include wet or standing yards, failing or absent footing drains, and slabs that settle or crack over poorly compacted fill. We also see drainage spilling onto neighboring lots, rockeries and retaining walls needed on slopes, stubborn tree-root and stump removal, and regrading to dry out wet basements and crawlspaces.

Local experience matters because Tacoma's slopes, till, and permit process all reward knowing the ground in advance. Having one crew handle both excavation and site prep and the concrete means the subgrade is built for the slab from day one, with fewer handoffs and fewer surprises.`,
    neighborhoods: [
      "North End",
      "Proctor",
      "Hilltop",
      "South Tacoma",
      "Northeast Tacoma",
      "Stadium District",
    ],
    nearbyCity: ["puyallup-wa", "federal-way-wa"],
  },
  {
    slug: "puyallup-wa",
    name: "Puyallup",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98371", "98372", "98373", "98374"],
    population: 42000,
    priority: "high",
    county: "Pierce",
    lat: 47.1854,
    lng: -122.2929,
    localContent: `Puyallup spreads across two very different landscapes, and the contrast shapes nearly every project here. Down on the valley floor the ground is Puyallup River alluvium, soft layered silts and sands deposited over time, often with a high water table and, in places, liquefaction and flood considerations that influence how foundations are designed. Up on South Hill the terrain rises onto a glacial-till plateau, where dense Vashon hardpan capped by Alderwood gravelly sandy loam sits beneath many newer neighborhoods. That till is firm but nearly impermeable, so winter water tends to perch rather than drain. For excavation and concrete this split matters: valley sites often need careful subgrade prep, compacted structural fill, and engineered approaches to soft soils, while plateau lots demand attention to drainage and compaction so slabs and footings stay stable through wet months.

Ground-disturbing work in Puyallup generally falls under City of Puyallup permitting, which handles clearing and grading permits and reviews projects against critical-areas ordinances covering erosion and landslide hazard areas, wetlands, and streams, all of which appear around the valley and its slopes. Stormwater design typically follows the Washington Department of Ecology Stormwater Management Manual for Western Washington, which guides how runoff is detained and released. A new or widened driveway approach usually requires a right-of-way permit for work in the public right-of-way. Because Puget-lowland frost depth is shallow, generally around twelve to eighteen inches, footings and foundations are designed accordingly, so bearing soil and drainage usually drive the design far more than frost.

Puyallup's areas each bring distinct conditions. South Hill is full of subdivisions where lot grading, driveways, and footing drains are routine on till soils. Downtown Puyallup and the Valley sit on softer alluvium where drainage and subgrade prep are central. Edgerton and Fruitland mix established homes and newer infill, where regrading and flatwork often go together. Knowing which ground you are on shapes the whole approach.

Pricing always depends on the details, but ranges help set expectations. A residential concrete driveway varies with size, thickness, access, and how much the subgrade needs reworking. A footing or French-drain install depends on trench length, depth, and where water can be routed. Lot grading and site prep scale with slope, soil, and how much material must be moved or imported. Taylor Creek prices each job after seeing the site rather than quoting blind.

Common local issues here include wet or standing yards, failing or missing footing drains, and slabs that settle or crack over poorly compacted fill, which is especially a concern on valley soils. We also see drainage running onto neighboring lots, retaining walls and rockeries on plateau slopes, tree-root and stump removal, and regrading to dry out wet basements and crawlspaces.

Local experience matters because Puyallup's valley alluvium, plateau till, and city permit process each call for a different plan. Having one crew handle both the excavation and site prep and the concrete means the subgrade is built for the slab from the start, with fewer handoffs and fewer surprises.`,
    neighborhoods: ["South Hill", "Downtown Puyallup", "Valley", "Edgerton", "Fruitland"],
    nearbyCity: ["tacoma-wa", "bonney-lake-wa"],
  },
  {
    slug: "bonney-lake-wa",
    name: "Bonney Lake",
    state: "Washington",
    stateAbbr: "WA",
    zip: ["98391"],
    population: 22000,
    priority: "medium",
    county: "Pierce",
    lat: 47.1773,
    lng: -122.1865,
    localContent: `Bonney Lake sits up on the plateau above the river valley, where glacial soils define the building conditions across most of the city. Much of the ground is Vashon glacial till, the dense gray hardpan left by the last ice sheet, frequently capped by Alderwood gravelly sandy loam. This till is firm to excavate but nearly impermeable, so winter water often perches near the surface rather than draining away, and many lots carry high seasonal water tables. With so many newer subdivisions and the large Tehaleh master-planned community still expanding, a great deal of work here begins with raw or rough-graded land. For excavation and concrete that means subgrade prep is central: structural fill has to be placed and compacted in lifts, drainage planned early, and slabs and footings set on a stable, well-drained base so they do not settle once the rains arrive.

Ground-disturbing projects in Bonney Lake generally fall under City of Bonney Lake permitting, which issues clearing and grading permits and reviews work against critical-areas ordinances covering erosion and landslide hazard areas, wetlands, and streams, several of which thread through the plateau and around Lake Tapps. Stormwater design typically follows the Washington Department of Ecology Stormwater Management Manual for Western Washington. A new or widened driveway approach usually needs a right-of-way permit for work in the public right-of-way. Because Puget-lowland frost depth is shallow, generally around twelve to eighteen inches, footings and foundations are designed for that, so bearing soil and drainage matter far more than frost depth.

Bonney Lake's neighborhoods each carry their own ground story. Around Lake Tapps, lakeside lots often need careful grading and drainage. Tehaleh, Sky Island, and Falling Water are newer planned areas where site prep, lot grading, and fresh flatwork are everyday work. Downtown Bonney Lake mixes older parcels and infill where regrades and driveway replacements are common. Each setting rewards knowing the soils ahead of time.

Pricing always depends on the specifics, but ranges help frame it. A residential concrete driveway varies with size, thickness, access, and subgrade condition. A footing or French-drain install depends on trench length, depth, and where the water can be routed. Lot grading and site prep scale with slope, soil, and how much material has to be moved or imported. Taylor Creek scopes each project on site rather than promising a figure in advance.

Common local issues include wet or standing yards, failing or absent footing drains, and slabs that settle or crack over poorly compacted fill, a real risk on newer subdivision lots built on imported fill. We also see drainage spilling onto neighboring lots, retaining walls and rockeries on plateau slopes, tree-root and stump removal, and regrading to dry out wet basements and crawlspaces.

Local experience matters because Bonney Lake's till soils, fill-heavy new construction, and city permit process all reward planning the ground in advance. Having one crew handle both excavation and site prep and the concrete means the subgrade is built for the slab from day one, with fewer handoffs and fewer surprises.`,
    neighborhoods: [
      "Lake Tapps",
      "Tehaleh",
      "Downtown Bonney Lake",
      "Sky Island",
      "Falling Water",
    ],
    nearbyCity: ["puyallup-wa", "auburn-wa"],
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getCitiesByPriority(priority: City["priority"]): City[] {
  return cities.filter((c) => c.priority === priority);
}

export function getCitiesByState(stateAbbr: string): City[] {
  return cities.filter((c) => c.stateAbbr === stateAbbr);
}

export function getCitiesByCounty(county: string): City[] {
  return cities.filter((c) => c.county === county);
}

export function getNearbyCities(city: City): City[] {
  return (city.nearbyCity ?? [])
    .map((slug) => getCityBySlug(slug))
    .filter((c): c is City => Boolean(c));
}
