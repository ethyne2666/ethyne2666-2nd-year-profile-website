// All system-design content lives here. To add a new design, add one object to DESIGNS.
// Diagram edges are derived automatically from each step's `path`.

export type Accent = "emerald" | "sky" | "violet" | "amber" | "rose" | "orange" | "teal" | "indigo";
export type Kind = "client" | "lb" | "service" | "cache" | "store" | "queue" | "worker" | "external";
export type VisualId = "base62" | "tokenBucket" | "ring" | "snowflake";

export interface DNode { id: string; label: string; sub?: string; kind: Kind; x: number; y: number }
export interface Step { title: string; text: string; path: string[] }
export interface Design {
  slug: string;
  chapter?: number;
  title: string;
  tagline: string;
  accent?: Accent;
  tags: string[];
  requirements: string[];
  nodes: DNode[];
  steps: Step[];
  ideas: { title: string; text: string }[];
  good: string[];
  bad: string[];
  numbers: { label: string; value: string }[];
  visual?: VisualId;
}

export const ACCENT: Record<Accent, { hex: string; badge: string; bar: string }> = {
  emerald: { hex: "#10b981", badge: "bg-emerald-50 text-emerald-700 ring-emerald-200", bar: "bg-emerald-500" },
  sky: { hex: "#0ea5e9", badge: "bg-sky-50 text-sky-700 ring-sky-200", bar: "bg-sky-500" },
  violet: { hex: "#8b5cf6", badge: "bg-violet-50 text-violet-700 ring-violet-200", bar: "bg-violet-500" },
  amber: { hex: "#f59e0b", badge: "bg-amber-50 text-amber-700 ring-amber-200", bar: "bg-amber-500" },
  rose: { hex: "#f43f5e", badge: "bg-rose-50 text-rose-700 ring-rose-200", bar: "bg-rose-500" },
  orange: { hex: "#f97316", badge: "bg-orange-50 text-orange-700 ring-orange-200", bar: "bg-orange-500" },
  teal: { hex: "#14b8a6", badge: "bg-teal-50 text-teal-700 ring-teal-200", bar: "bg-teal-500" },
  indigo: { hex: "#6366f1", badge: "bg-indigo-50 text-indigo-700 ring-indigo-200", bar: "bg-indigo-500" },
};

// col 0-3, row 0-3 on the diagram grid
export const n = (id: string, label: string, kind: Kind, col: number, row: number, sub?: string): DNode => ({
  id, label, kind, sub, x: 80 + col * 190, y: 46 + row * 90,
});

export const DESIGNS: Design[] = [
  /* ───────────── 1. URL SHORTENER ───────────── */
  {
    slug: "url-shortener",
    chapter: 8,
    title: "URL Shortener",
    tagline: "Turn a giant link into a 7-character one, and redirect fast.",
    accent: "emerald",
    tags: ["hashing", "cache", "database"],
    requirements: [
      "Short URLs must be unique and as short as possible",
      "100M new URLs per day, supported for 10 years",
      "Reads outnumber writes about 10 to 1",
    ],
    nodes: [
      n("client", "Browser", "client", 0, 1),
      n("lb", "Load Balancer", "lb", 1, 1),
      n("api", "API Server", "service", 2, 1),
      n("cache", "Cache", "cache", 3, 0, "hot URLs"),
      n("idgen", "ID Generator", "service", 2, 2, "unique number"),
      n("db", "Database", "store", 3, 2, "id | short | long"),
    ],
    steps: [
      { title: "Shorten a URL", text: "The client POSTs a long URL. The API asks the ID generator for a unique number, converts it to base 62 (for example 2009215674938 becomes zn9edcu) and saves the mapping in the database.", path: ["client", "lb", "api", "idgen", "api", "db"] },
      { title: "Redirect: cache hit", text: "Someone opens the short link. The API checks the cache first. Popular links are answered from memory without touching the database.", path: ["client", "lb", "api", "cache", "api", "lb", "client"] },
      { title: "Redirect: cache miss", text: "Not in cache, so the API reads the database, refills the cache for next time, and replies with an HTTP 301 or 302 redirect to the long URL.", path: ["client", "lb", "api", "cache", "api", "db", "api", "lb", "client"] },
    ],
    ideas: [
      { title: "Base 62 encoding", text: "Digits plus a-z plus A-Z give 62 symbols. Seven characters cover 62^7, about 3.5 trillion URLs, which is plenty." },
      { title: "301 vs 302", text: "301 is permanent and browsers cache it, which lowers server load. 302 is temporary, so every click still hits you, which is what you want for click analytics." },
      { title: "Hash + collisions", text: "The alternative is hashing the long URL (CRC32, MD5) and keeping 7 characters. Collisions then need a check, and a Bloom filter makes that check cheap." },
      { title: "Cache the hot links", text: "A small share of links gets most of the traffic. A cache in front of the database absorbs the 10:1 read load." },
    ],
    good: ["No collisions with the ID approach", "Very short links", "Reads are fast thanks to the cache"],
    bad: ["Needs a distributed unique ID generator", "Sequential IDs make links guessable", "Cache invalidation on deletes"],
    numbers: [
      { label: "Writes / sec", value: "~1,160" },
      { label: "Reads / sec", value: "~11,600" },
      { label: "Records in 10 yrs", value: "365 billion" },
      { label: "Storage", value: "~365 TB" },
    ],
    visual: "base62",
  },

  /* ───────────── 2. RATE LIMITER ───────────── */
  {
    slug: "rate-limiter",
    chapter: 4,
    title: "Rate Limiter",
    tagline: "Protect your API from floods by capping requests per user.",
    accent: "sky",
    tags: ["api gateway", "redis", "algorithms"],
    requirements: [
      "Accurately limit excess requests",
      "Add almost no latency",
      "Work across many servers and tell users when they are throttled",
    ],
    nodes: [
      n("client", "Client", "client", 0, 1),
      n("limiter", "Rate Limiter", "lb", 1, 1, "middleware"),
      n("rules", "Rules Config", "store", 1, 0, "limits per API"),
      n("redis", "Redis", "cache", 1, 2, "counters"),
      n("api", "API Server", "service", 2, 1),
    ],
    steps: [
      { title: "Look up the rule", text: "Every request first passes the limiter. It loads the rule for this endpoint and user, for example 5 requests per second.", path: ["client", "limiter", "rules", "limiter"] },
      { title: "Check the counter", text: "The limiter reads and updates this user's counter or token count in Redis. Redis is fast, and shared by every limiter instance.", path: ["limiter", "redis", "limiter"] },
      { title: "Under the limit: forward", text: "There is capacity left, so the request goes through to the API server and the response returns normally.", path: ["client", "limiter", "api", "limiter", "client"] },
      { title: "Over the limit: HTTP 429", text: "No capacity left. The limiter answers 429 Too Many Requests straight away, with headers saying how long to wait. The API server never sees it.", path: ["client", "limiter", "client"] },
    ],
    ideas: [
      { title: "Token bucket", text: "A bucket refills at a steady rate and each request spends a token. It allows short bursts and is simple, which is why many big APIs use it." },
      { title: "Leaking bucket", text: "Requests wait in a FIFO queue and leave at a fixed rate. The output is perfectly smooth, but a burst can delay newer requests." },
      { title: "Fixed window counter", text: "Count per time window. Easy, but a spike at the edge of two windows can let through double the limit." },
      { title: "Where to put it", text: "Server side, usually in an API gateway. Client-side limits are easy to bypass." },
    ],
    good: ["Stops abuse and DoS", "Cuts cost from useless traffic", "Fast to check"],
    bad: ["Race conditions on shared counters", "Algorithm choice needs tuning", "Redis becomes a dependency"],
    numbers: [
      { label: "Throttled status", value: "429" },
      { label: "Header", value: "X-Ratelimit-Remaining" },
      { label: "Header", value: "Retry-After" },
    ],
    visual: "tokenBucket",
  },

  /* ───────────── 3. CONSISTENT HASHING ───────────── */
  {
    slug: "consistent-hashing",
    chapter: 5,
    title: "Consistent Hashing",
    tagline: "Add or remove servers without reshuffling every key.",
    accent: "violet",
    tags: ["distributed cache", "sharding"],
    requirements: [
      "Spread keys evenly across servers",
      "Adding or removing a server should move as few keys as possible",
      "Avoid cache-miss storms when the pool changes",
    ],
    nodes: [
      n("client", "Client", "client", 0, 1),
      n("router", "Hash Ring", "lb", 1, 1, "picks the owner"),
      n("a", "Server A", "cache", 2, 0),
      n("b", "Server B", "cache", 2, 1),
      n("c", "Server C", "cache", 2, 2),
      n("d", "Server D", "cache", 3, 1, "newly added"),
    ],
    steps: [
      { title: "Hash the key", text: "The key is hashed onto a ring of values. Servers are hashed onto the same ring using their name or IP.", path: ["client", "router"] },
      { title: "Walk clockwise", text: "From the key's position, walk clockwise until you meet a server. That server owns the key.", path: ["router", "a"] },
      { title: "A server dies", text: "Only the keys that belonged to the dead server move, and they go to the next server clockwise. Everything else stays put.", path: ["router", "b"] },
      { title: "A server joins", text: "A new server takes over only the keys between itself and the previous server on the ring. Nothing else moves.", path: ["router", "d"] },
    ],
    ideas: [
      { title: "The rehashing problem", text: "With hash(key) % N, changing N changes the answer for most keys. A cache would suddenly miss on almost everything." },
      { title: "The ring", text: "Both keys and servers live on a circle. Ownership means the next server clockwise, so changes stay local." },
      { title: "Virtual nodes", text: "Each server appears several times on the ring. This evens out partition sizes and spreads load more fairly." },
      { title: "In the wild", text: "Amazon DynamoDB, Apache Cassandra, Discord and Akamai's CDN all use it." },
    ],
    good: ["Minimal key movement", "Easy horizontal scaling", "Reduces hotspots with virtual nodes"],
    bad: ["Uneven spread without virtual nodes", "More complex than modulo", "Ring state must be shared"],
    numbers: [
      { label: "Keys moved on change", value: "~1 / N" },
      { label: "With modulo", value: "almost all" },
    ],
    visual: "ring",
  },

  /* ───────────── 4. UNIQUE ID GENERATOR ───────────── */
  {
    slug: "unique-id-generator",
    chapter: 7,
    title: "Unique ID Generator",
    tagline: "Make sortable, collision-free IDs on many machines (Snowflake).",
    accent: "amber",
    tags: ["distributed", "snowflake", "time"],
    requirements: [
      "IDs are unique, numeric and fit in 64 bits",
      "IDs are sortable by time",
      "Generate more than 10,000 IDs per second",
    ],
    nodes: [
      n("app", "App Server", "service", 0, 1),
      n("db", "Database", "store", 0, 2, "sorted by ID"),
      n("gen1", "ID Gen DC-1", "worker", 1, 0, "machine 1"),
      n("gen2", "ID Gen DC-2", "worker", 1, 2, "machine 2"),
      n("clock", "Clock + NTP", "external", 2, 1, "time source"),
    ],
    steps: [
      { title: "Ask for an ID", text: "The app server calls a nearby ID generator. No central ticket server and no coordination round trip.", path: ["app", "gen1"] },
      { title: "Build 64 bits", text: "The generator reads the clock and packs timestamp, datacenter, machine and a sequence number into one 64-bit integer.", path: ["gen1", "clock", "gen1"] },
      { title: "Other machines, same time", text: "Another machine with a different machine number can never produce the same ID, even in the same millisecond.", path: ["app", "gen2", "clock", "gen2"] },
      { title: "IDs sort by time", text: "Because the timestamp sits in the top bits, newer IDs are bigger. The database can order rows by ID.", path: ["app", "db"] },
    ],
    ideas: [
      { title: "The bit layout", text: "1 sign bit, 41 bits of timestamp, 5 datacenter bits, 5 machine bits and 12 sequence bits. That is 4096 IDs per millisecond per machine." },
      { title: "Why not UUID?", text: "UUIDs are unique but 128 bits and not time-sortable. Snowflake IDs are half the size and ordered." },
      { title: "Why not auto-increment?", text: "A single ticket server is a bottleneck and a single point of failure. Multi-master steps do not scale across datacenters well." },
      { title: "Clock drift", text: "The design trusts clocks. NTP keeps servers close, but a clock going backwards needs special handling." },
    ],
    good: ["64-bit and sortable", "No coordination between machines", "Very high throughput"],
    bad: ["Depends on synchronized clocks", "Needs unique machine IDs assigned", "Timestamp bits run out after about 69 years"],
    numbers: [
      { label: "IDs / ms / machine", value: "4,096" },
      { label: "Timestamp range", value: "~69 years" },
      { label: "Bit width", value: "64" },
    ],
    visual: "snowflake",
  },

  /* ───────────── 5. CHAT SYSTEM ───────────── */
  {
    slug: "chat-system",
    chapter: 12,
    title: "Chat System",
    tagline: "Deliver messages instantly over WebSockets, even to offline users.",
    accent: "rose",
    tags: ["websocket", "real-time", "key-value"],
    requirements: [
      "1-on-1 chat and group chat up to 100 people",
      "Online presence and multiple devices",
      "50 million daily users with permanent history",
    ],
    nodes: [
      n("ua", "User A", "client", 0, 0),
      n("ub", "User B", "client", 0, 2),
      n("cs1", "Chat Server 1", "service", 1, 0, "WebSocket"),
      n("cs2", "Chat Server 2", "service", 1, 2, "WebSocket"),
      n("sync", "Message Sync", "queue", 2, 1, "queue"),
      n("kv", "Key-Value Store", "store", 3, 0, "chat history"),
      n("push", "Push Service", "external", 3, 2, "APNs / FCM"),
    ],
    steps: [
      { title: "Send over WebSocket", text: "User A keeps a persistent WebSocket to Chat Server 1 and sends the message through it.", path: ["ua", "cs1"] },
      { title: "Assign an ID and save", text: "The server gives the message an ID that increases with time, then stores it in a key-value store built for huge write volume.", path: ["cs1", "kv"] },
      { title: "B is online: forward", text: "The message is handed through the sync queue to the server holding User B's WebSocket, which pushes it down instantly.", path: ["cs1", "sync", "cs2", "ub"] },
      { title: "B is offline: push", text: "If B has no live connection, a push notification goes out. When B returns, the app syncs everything newer than its last message ID.", path: ["cs2", "push", "ub"] },
    ],
    ideas: [
      { title: "WebSocket vs HTTP", text: "Sending can use plain HTTP, but receiving needs a persistent connection so the server can push. WebSocket gives both directions." },
      { title: "Stateless and stateful", text: "Login and profile APIs are stateless. Chat servers are stateful because they hold open connections, so service discovery picks the best one." },
      { title: "Ordering with message IDs", text: "IDs only need to be ordered within a chat. Clients ask for messages with an ID greater than the last one they have." },
      { title: "Group fan-out", text: "A message is copied into every member's inbox. That makes sync simple but gets costly, which is why groups are capped." },
    ],
    good: ["Instant delivery", "Offline users still reach", "History scales with a key-value store"],
    bad: ["Stateful servers are harder to scale", "Group fan-out is expensive", "Reconnect and presence logic is tricky"],
    numbers: [
      { label: "Daily users", value: "50 million" },
      { label: "Group size limit", value: "100" },
    ],
  },

  /* ───────────── 6. NOTIFICATION SYSTEM ───────────── */
  {
    slug: "notification-system",
    chapter: 10,
    title: "Notification System",
    tagline: "Send push, SMS and email reliably without blocking anything.",
    accent: "teal",
    tags: ["queue", "workers", "reliability"],
    requirements: [
      "Support push, SMS and email",
      "Soft real-time and very high volume",
      "Respect user opt-outs and never lose a notification",
    ],
    nodes: [
      n("svc", "Services 1..n", "service", 0, 1, "event sources"),
      n("api", "Notif Servers", "service", 1, 1),
      n("db", "User Settings", "store", 1, 0, "opt-in, devices"),
      n("mq", "Message Queues", "queue", 2, 1, "one per channel"),
      n("wk", "Workers", "worker", 3, 1),
      n("push", "APNs / FCM", "external", 3, 0),
      n("mail", "SMS / Email", "external", 3, 2),
    ],
    steps: [
      { title: "A service raises an event", text: "Another service, such as billing or a cron job, calls the notification servers with who to tell and what to say.", path: ["svc", "api"] },
      { title: "Validate and check settings", text: "The server checks the user's preferences and device tokens, and drops anything the user opted out of.", path: ["api", "db", "api"] },
      { title: "Queue it per channel", text: "The notification is put on a queue, one queue per channel. Email being slow cannot hold up push.", path: ["api", "mq"] },
      { title: "Workers deliver", text: "Workers pull from the queue and call third-party providers, retrying on failure.", path: ["mq", "wk", "push"] },
      { title: "Other channels", text: "The same pipeline delivers SMS and email through their own providers.", path: ["wk", "mail"] },
    ],
    ideas: [
      { title: "Decouple with queues", text: "Queues absorb bursts and let workers scale independently of the servers that accept requests." },
      { title: "Retry and dedupe", text: "Failed sends are retried. An event ID lets you drop duplicates so people are not notified twice." },
      { title: "Opt-in and limits", text: "Always check preferences, and cap how many notifications one person gets so the system does not become spam." },
      { title: "Third parties", text: "Apple and Google deliver push, and SMS or email go through providers. Each can fail, so isolate them." },
    ],
    good: ["Channels fail independently", "Easy to scale workers", "Bursts are smoothed by queues"],
    bad: ["Delivery is at-least-once, so duplicates are possible", "Providers add latency and cost", "Needs monitoring of queue depth"],
    numbers: [
      { label: "Channels", value: "push, SMS, email" },
      { label: "Delivery", value: "at-least-once" },
    ],
  },

  /* ───────────── 7. NEWS FEED ───────────── */
  {
    slug: "news-feed",
    chapter: 11,
    title: "News Feed System",
    tagline: "Show each user a fresh feed built from the people they follow.",
    accent: "indigo",
    tags: ["fan-out", "cache", "graph"],
    requirements: [
      "Publish a post and have friends see it in their feed",
      "Feed loads quickly and is ordered by time or relevance",
      "Handle users with millions of followers",
    ],
    nodes: [
      n("user", "User", "client", 0, 1),
      n("post", "Post Service", "service", 1, 0),
      n("feed", "Feed Service", "service", 1, 2),
      n("fan", "Fanout Workers", "worker", 2, 0),
      n("graph", "Friends Graph", "store", 3, 0, "who follows whom"),
      n("cache", "Feed Cache", "cache", 2, 2, "per-user feeds"),
    ],
    steps: [
      { title: "Publish a post", text: "The user posts. The post service stores it and hands off to fanout.", path: ["user", "post"] },
      { title: "Find the audience", text: "Fanout workers ask the friends graph who should see this post.", path: ["post", "fan", "graph", "fan"] },
      { title: "Fan out to feed caches", text: "The post ID is pushed into every friend's feed cache, so feeds are ready before anyone asks.", path: ["fan", "cache"] },
      { title: "Read the feed", text: "When a friend opens the app, the feed service reads their prebuilt feed straight from cache. It is very fast.", path: ["user", "feed", "cache", "feed", "user"] },
    ],
    ideas: [
      { title: "Fanout on write (push)", text: "Do the work when posting. Reads are instant, but a celebrity post means millions of writes." },
      { title: "Fanout on read (pull)", text: "Build the feed when opening the app. Cheap to publish, but slow to read." },
      { title: "Hybrid", text: "Push for normal users and pull for celebrities. This is what most large systems settle on." },
      { title: "Cache layers", text: "Store post IDs in the feed cache and fetch full content from separate caches, so one post is not copied everywhere." },
    ],
    good: ["Reads are very fast", "Feeds are precomputed", "Hybrid handles celebrities"],
    bad: ["Heavy write amplification", "Inactive users waste cache space", "Hybrid logic is more complex"],
    numbers: [
      { label: "Push cost", value: "1 write per follower" },
      { label: "Pull cost", value: "1 merge per read" },
    ],
  },

  /* ───────────── 8. WEB CRAWLER ───────────── */
  {
    slug: "web-crawler",
    chapter: 9,
    title: "Web Crawler",
    tagline: "Discover and download billions of pages politely and without repeats.",
    accent: "orange",
    tags: ["queue", "bfs", "dedupe"],
    requirements: [
      "Crawl the web starting from seed URLs",
      "Be polite to websites and avoid duplicates",
      "Scalable and robust against bad pages",
    ],
    nodes: [
      n("seed", "Seed URLs", "store", 0, 1),
      n("front", "URL Frontier", "queue", 1, 1, "to-do list"),
      n("dns", "DNS Resolver", "external", 2, 0),
      n("dl", "HTML Downloader", "worker", 2, 1),
      n("filter", "URL Filter", "service", 2, 2, "seen before?"),
      n("parse", "Content Parser", "service", 3, 1),
      n("seen", "Content Seen?", "cache", 3, 0, "dedupe by hash"),
      n("store", "Storage", "store", 3, 2),
    ],
    steps: [
      { title: "Start from seeds", text: "The frontier is a queue of URLs to visit. It starts with hand-picked seed pages.", path: ["seed", "front"] },
      { title: "Download politely", text: "The downloader takes a URL, resolves the host through DNS, and fetches the page. The frontier spaces out requests per host to stay polite.", path: ["front", "dl", "dns", "dl"] },
      { title: "Parse and dedupe content", text: "The parser validates the HTML. A content hash check throws away pages that are copies of ones already seen.", path: ["dl", "parse", "seen", "parse"] },
      { title: "Store the page", text: "New pages go to storage for later indexing.", path: ["parse", "store"] },
      { title: "Find new links", text: "Links in the page are filtered against already-seen URLs, then pushed back into the frontier. The loop continues.", path: ["parse", "filter", "front"] },
    ],
    ideas: [
      { title: "BFS with a queue", text: "A crawl is breadth-first search over the web graph, with the URL frontier as the queue." },
      { title: "Politeness", text: "One queue per host and a delay between requests keeps you from hammering a site. Honour robots.txt too." },
      { title: "Avoid duplicates", text: "Track seen URLs and content hashes. Bloom filters keep this cheap at billions of entries." },
      { title: "Spider traps", text: "Infinite link chains can trap a crawler. Cap URL length and depth, and blocklist bad sites." },
    ],
    good: ["Parallel downloaders scale out", "Dedupe saves storage", "Politeness avoids bans"],
    bad: ["Frontier is complex at scale", "Dynamic JS pages are hard to crawl", "Traps and junk content"],
    numbers: [
      { label: "Core structure", value: "BFS queue" },
      { label: "Dedupe", value: "hash / Bloom filter" },
    ],
  },
];

export const findDesign = (slug: string | null) => DESIGNS.find((d) => d.slug === slug) ?? null;