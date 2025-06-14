DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS colors;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS order_items;

CREATE TABLE users (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE colors (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE products (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  category_id INT REFERENCES categories(id),
  color_id INT REFERENCES colors(id),
  image TEXT,
  is_new BOOLEAN DEFAULT FALSE,
  is_sale BOOLEAN DEFAULT FALSE,
  favorite BOOLEAN DEFAULT FALSE
);

CREATE TABLE orders (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total NUMERIC(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending'
    CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled'))
);

CREATE TABLE order_items (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INT NOT NULL REFERENCES products(id),
  quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
  price_at_order NUMERIC(10, 2) NOT NULL
);

INSERT INTO categories (name) VALUES
  ('Ljus'),
  ('Lampor'),
  ('Textil'),
  ('Keramik'),
  ('Vaser');

INSERT INTO colors (name) VALUES
  ('Svart'),
  ('Vit'),
  ('Beige'),
  ('Orange'),
  ('Grön'),
  ('Brun'),
  ('Grå'),
  ('Blå'),
  ('Gul'),
  ('Röd'),
  ('Lila'),
  ('Silver');

INSERT INTO products (
  name, description, price,
  category_id, color_id, image,
  is_new, is_sale, favorite
) VALUES
(
  'Doft pinnar',
  'Våra exklusiva doftpinnar är designade för att förvandla ditt hem till en lugn oas av behaglig doft och harmoni. Tillverkade av premium naturliga rottingpinnar som effektivt absorberar och sprider doftoljor.

  Antal pinnar per förpackning: 8 st
  Kompatibel med alla standarddoftoljor',
  159,
  1,
  1,
  '/images/doftpinnar.webp',
  TRUE, FALSE, FALSE
),
(
  'Bordslampa Ray',
  'Uppladdningsbar bordslampa med justerbart ljus. Den har tre ljuslägen och är dimbar via touch-funktion på lampans huvud. Laddas med USB-C (100 cm sladd ingår, adapter medföljer ej).

  Batteritiden är 4–10 timmar
  Fulladdad på 3 timmar',
  399,
  2,
  3,
  '/images/bordslampaRay.webp',
  TRUE, FALSE, FALSE
),
(
  'Påslakanset Vera',
  'Påslakan i 100% ekologisk bomull. Påslakanet har en dold knappslå och kuddfodralen har en oxfordkant runt om.

  Tvättråd: Maskintvätt 60°C
  Trådtäthet 144 TC',
  499,
  3,
  4,
  '/images/påslakansetVera.webp',
  TRUE, FALSE, FALSE
),
(
  'Sculptur Bloom',
  'Krom skulptur i form av en blomma. Skulpturen är en modern inredningsdetalj som passar såväl minimalistiska som mer klassiska hem. Varje exemplar är handgjord och kan därför variera något i form och färg.

  Höjd: 20 cm
  Diameter: 10 cm',
  199,
  4,
  6,
  '/images/sculpturBloom.webp',
  FALSE, TRUE, FALSE
),
(
  'Bordslampa Svamp',
  'Uppladdningsbar bordslampa med justerbart ljus. Den har tre ljuslägen och är dimbar via touch-funktion på lampans huvud. Laddas med USB-C (100 cm sladd ingår, adapter medföljer ej).

  Batteritiden är 4–10 timmar
  Fulladdad på 3 timmar',
  399,
  2,
  4,
  '/images/bordslampaSvamp.webp',
  FALSE, TRUE, FALSE
),
(
  'Vas Elsa',
  'Denna keramikvas är skapad med en modern geometrisk design. Den passar lika bra som en dekorativ detalj som för att arrangera blommor eller grenar.

  Höjd: 20 cm
  Diameter: 10 cm',
  299,
  5,
  2,
  '/images/vasElsa.webp',
  TRUE, FALSE, FALSE
),
(
  'Bordslampa Mona',
  'Uppladdningsbar bordslampa med justerbart ljus. Den har tre ljuslägen och är dimbar via touch-funktion på lampans huvud. Laddas med USB-C (100 cm sladd ingår, adapter medföljer ej).

  Batteritiden är 4–10 timmar
  Fulladdad på 3 timmar',
  379,
  2,
  4,
  '/images/bordslampaMona.webp',
  TRUE, FALSE, FALSE
),
(
  'Doftljus',
  'Våra doftljus är tillverkade av 100% sojavax och har en brinntid på 30 timmar. Doftljusen är handgjorda och kommer i en vacker glasburk med lock.

  Vikt: 200 g',
  59,
  1,
  2,
  '/images/doftljus.webp',
  FALSE, FALSE, FALSE
),
(
  'Bordslampa Lina',
  'Uppladdningsbar bordslampa med justerbart ljus. Den har tre ljuslägen och är dimbar via touch-funktion på lampans huvud. Laddas med USB-C (100 cm sladd ingår, adapter medföljer ej).

  Batteritiden är 4–10 timmar
  Fulladdad på 3 timmar',
  399,
  2,
  5,
  '/images/bordslampaLina.webp',
  FALSE, FALSE, FALSE
),
(
  'Tallriksset 3 st',
  'Tallriksset i keramik bestående av tre tallrikar i olika storlekar. Tallrikarna är handgjorda Tallrikarna är handgjorda och kan därför variera något i form och färg.

  Diameter: 20 cm, 25 cm, 30 cm',
  399,
  4,
  6,
  '/images/tallriksset.webp',
  FALSE, FALSE, FALSE
),
(
  'Doftljus 2 st',
  'Våra doftljus är tillverkade av 100% sojavax och har en brinntid på 30 timmar. Doftljusen är handgjorda och kommer i en vacker glasburk med lock.

  Vikt: 200 g',
  189,
  1,
  2,
  '/images/doftljus2st.webp',
  FALSE, FALSE, FALSE
),
