--
-- PostgreSQL database dump
--

-- Dumped from database version 10.1
-- Dumped by pg_dump version 10.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Activities; Type: TABLE; Schema: public; Owner: username
--

CREATE TABLE "Activities" (
    id integer NOT NULL,
    theme character varying(255),
    location character varying(255),
    departdate character varying(255),
    finishdate character varying(255),
    budget character varying(255),
    services text[],
    story character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer
);


ALTER TABLE "Activities" OWNER TO username;

--
-- Name: Activities_id_seq; Type: SEQUENCE; Schema: public; Owner: username
--

CREATE SEQUENCE "Activities_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Activities_id_seq" OWNER TO username;

--
-- Name: Activities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: username
--

ALTER SEQUENCE "Activities_id_seq" OWNED BY "Activities".id;


--
-- Name: ActivityLikes; Type: TABLE; Schema: public; Owner: username
--

CREATE TABLE "ActivityLikes" (
    id integer NOT NULL,
    "numOfLikes" integer,
    "userMarkers" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "activityId" integer
);


ALTER TABLE "ActivityLikes" OWNER TO username;

--
-- Name: ActivityLikes_id_seq; Type: SEQUENCE; Schema: public; Owner: username
--

CREATE SEQUENCE "ActivityLikes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ActivityLikes_id_seq" OWNER TO username;

--
-- Name: ActivityLikes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: username
--

ALTER SEQUENCE "ActivityLikes_id_seq" OWNED BY "ActivityLikes".id;


--
-- Name: Favorites; Type: TABLE; Schema: public; Owner: username
--

CREATE TABLE "Favorites" (
    id integer NOT NULL,
    favorites integer[],
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer
);


ALTER TABLE "Favorites" OWNER TO username;

--
-- Name: Favorites_id_seq; Type: SEQUENCE; Schema: public; Owner: username
--

CREATE SEQUENCE "Favorites_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Favorites_id_seq" OWNER TO username;

--
-- Name: Favorites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: username
--

ALTER SEQUENCE "Favorites_id_seq" OWNED BY "Favorites".id;


--
-- Name: Ratings; Type: TABLE; Schema: public; Owner: username
--

CREATE TABLE "Ratings" (
    id integer NOT NULL,
    feedback character varying(255),
    "numOfStars" integer,
    "userId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "activityId" integer
);


ALTER TABLE "Ratings" OWNER TO username;

--
-- Name: Ratings_id_seq; Type: SEQUENCE; Schema: public; Owner: username
--

CREATE SEQUENCE "Ratings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ratings_id_seq" OWNER TO username;

--
-- Name: Ratings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: username
--

ALTER SEQUENCE "Ratings_id_seq" OWNED BY "Ratings".id;


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: username
--

CREATE TABLE "SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE "SequelizeMeta" OWNER TO username;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: username
--

CREATE TABLE "Users" (
    id integer NOT NULL,
    mail character varying(255),
    password character varying(255),
    username character varying(255),
    sex character varying(255),
    age integer,
    city character varying(255),
    "yearOfLiving" integer,
    hometown character varying(255),
    school character varying(255),
    major character varying(255),
    language character varying(255),
    hobby character varying(255),
    personality character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Users" OWNER TO username;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: username
--

CREATE SEQUENCE "Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Users_id_seq" OWNER TO username;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: username
--

ALTER SEQUENCE "Users_id_seq" OWNED BY "Users".id;


--
-- Name: WishLikes; Type: TABLE; Schema: public; Owner: username
--

CREATE TABLE "WishLikes" (
    id integer NOT NULL,
    "numOfLikes" integer,
    "userMarkers" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "wishId" integer
);


ALTER TABLE "WishLikes" OWNER TO username;

--
-- Name: WishLikes_id_seq; Type: SEQUENCE; Schema: public; Owner: username
--

CREATE SEQUENCE "WishLikes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "WishLikes_id_seq" OWNER TO username;

--
-- Name: WishLikes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: username
--

ALTER SEQUENCE "WishLikes_id_seq" OWNED BY "WishLikes".id;


--
-- Name: Wishes; Type: TABLE; Schema: public; Owner: username
--

CREATE TABLE "Wishes" (
    id integer NOT NULL,
    location character varying(255),
    departdate character varying(255),
    finishdate character varying(255),
    budget numeric(10,0),
    services text[],
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer,
    note character varying
);


ALTER TABLE "Wishes" OWNER TO username;

--
-- Name: Wishes_id_seq; Type: SEQUENCE; Schema: public; Owner: username
--

CREATE SEQUENCE "Wishes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Wishes_id_seq" OWNER TO username;

--
-- Name: Wishes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: username
--

ALTER SEQUENCE "Wishes_id_seq" OWNED BY "Wishes".id;


--
-- Name: Activities id; Type: DEFAULT; Schema: public; Owner: username
--

ALTER TABLE ONLY "Activities" ALTER COLUMN id SET DEFAULT nextval('"Activities_id_seq"'::regclass);


--
-- Name: ActivityLikes id; Type: DEFAULT; Schema: public; Owner: username
--

ALTER TABLE ONLY "ActivityLikes" ALTER COLUMN id SET DEFAULT nextval('"ActivityLikes_id_seq"'::regclass);


--
-- Name: Favorites id; Type: DEFAULT; Schema: public; Owner: username
--

ALTER TABLE ONLY "Favorites" ALTER COLUMN id SET DEFAULT nextval('"Favorites_id_seq"'::regclass);


--
-- Name: Ratings id; Type: DEFAULT; Schema: public; Owner: username
--

ALTER TABLE ONLY "Ratings" ALTER COLUMN id SET DEFAULT nextval('"Ratings_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: username
--

ALTER TABLE ONLY "Users" ALTER COLUMN id SET DEFAULT nextval('"Users_id_seq"'::regclass);


--
-- Name: WishLikes id; Type: DEFAULT; Schema: public; Owner: username
--

ALTER TABLE ONLY "WishLikes" ALTER COLUMN id SET DEFAULT nextval('"WishLikes_id_seq"'::regclass);


--
-- Name: Wishes id; Type: DEFAULT; Schema: public; Owner: username
--

ALTER TABLE ONLY "Wishes" ALTER COLUMN id SET DEFAULT nextval('"Wishes_id_seq"'::regclass);


--
-- Data for Name: Activities; Type: TABLE DATA; Schema: public; Owner: username
--

COPY "Activities" (id, theme, location, departdate, finishdate, budget, services, story, "createdAt", "updatedAt", "userId") FROM stdin;
24	大连老虎滩公园2日游	大连市 辽宁省	13 Apr 2018 4:31	15 Apr 2018 4:31	500	{徒步旅行}	老虎滩公园是国家4A景区，美丽的海滩，老虎雕塑，各种游乐设施，北方的发现王国。	2018-03-14 16:32:37.532-07	2018-03-14 16:32:37.532-07	36
18	青岛海边小城3日游	青岛市 山东省	11 Apr 2018 2:55	19 Apr 2018 2:55	4200	{徒步旅行}	我在青岛生活了2年。我爱这里清新的海风，美味的海鲜，淳朴热情的本地居民。青岛犹如中国东海岸一颗耀眼的明珠，熠熠生辉。我来带你吃地道的青岛海鲜，呼吸最清爽的海风。	2018-03-12 14:56:27.342-07	2018-03-12 14:56:27.342-07	31
19	珠海夜景2日游	珠海市 广东省	19 Apr 2018 2:55	21 Apr 2018 2:55	2800	{徒步旅行,汽车接送}	我土生土长在珠海。珠海是一个美丽的城市。白天的珠海，车水马龙，熙熙攘攘，夜间的珠海五光十色，耀眼夺目。我将带你到珠海的最高塔上，眺望整个珠海的夜景，体验什么叫炫目和闪耀。	2018-03-12 15:02:23.74-07	2018-03-12 15:02:52.743-07	32
20	敦煌一周游	敦煌市 甘肃省	20 Apr 2018 2:55	2018-04-28T09:55:00.000Z	5800	{徒步旅行,汽车接送}	敦煌是一个充满神秘历史的城市。我在这里长大。虽然已经离家多年，可是每年回去都有新的发现。敦煌就像一颗在沙漠中一尘不染的珍珠，吸引着世界各地的来客。我将带你领略常人所不知的敦煌的神秘。	2018-03-12 15:06:24.743-07	2018-03-12 15:06:24.743-07	33
21	大连城市风光游	大连市 辽宁省	24 Mar 2018 4:31	30 Mar 2018 4:31	5200	{徒步旅行,汽车接送}	我在大连出生长大。大连是一个开放，热情的北方城市，温带海洋性气候。大连的白天，蓝天白云绿地，大连的傍晚，是浪漫的不夜城。	2018-03-12 16:34:08.304-07	2018-03-13 17:08:32.347-07	35
\.


--
-- Data for Name: ActivityLikes; Type: TABLE DATA; Schema: public; Owner: username
--

COPY "ActivityLikes" (id, "numOfLikes", "userMarkers", "createdAt", "updatedAt", "activityId") FROM stdin;
32	0		2018-03-12 14:56:27.413-07	2018-03-13 21:02:44.616-07	18
33	3	33;35;36;	2018-03-12 15:02:23.815-07	2018-03-14 16:30:46.881-07	19
34	0		2018-03-12 15:06:24.819-07	2018-03-14 16:30:53.821-07	20
37	0		2018-03-14 16:32:39.264-07	2018-03-14 16:32:39.264-07	24
35	1	36;	2018-03-12 16:34:08.413-07	2018-03-14 16:34:10.289-07	21
\.


--
-- Data for Name: Favorites; Type: TABLE DATA; Schema: public; Owner: username
--

COPY "Favorites" (id, favorites, "createdAt", "updatedAt", "userId") FROM stdin;
10	{19,21}	2018-03-12 22:50:06.105-07	2018-03-14 16:34:10.291-07	36
9	{20,18,23}	2018-03-12 16:29:26.391-07	2018-03-14 22:36:47.031-07	35
7	{17}	2018-03-12 14:56:53.5-07	2018-03-12 14:56:53.513-07	31
8	{19,17}	2018-03-12 15:06:43.295-07	2018-03-12 15:06:47.096-07	33
\.


--
-- Data for Name: Ratings; Type: TABLE DATA; Schema: public; Owner: username
--

COPY "Ratings" (id, feedback, "numOfStars", "userId", "createdAt", "updatedAt", "activityId") FROM stdin;
51	哥斯拉是一个处处带给你惊喜的本地达人！	4	33	2018-03-12 15:07:43.858-07	2018-03-12 15:07:43.858-07	18
52	去珠海还找曹格格！	5	36	2018-03-12 22:50:25.302-07	2018-03-12 22:50:25.302-07	19
53		2	35	2018-03-14 13:01:48.995-07	2018-03-14 13:01:48.995-07	18
54	非常不错！	5	36	2018-03-14 13:34:57.272-07	2018-03-14 13:34:57.272-07	21
\.


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: username
--

COPY "SequelizeMeta" (name) FROM stdin;
20180101220029-create-user.js
20180101220044-create-activity.js
20180103231338-create-demand.js
20180103235237-create-activity.js
20180104005345-create-activity.js
20180103231338-create-wish.js
20180107204242-create-activity-likes.js
20180107205238-create-wish-likes.js
20180108013640-create-activity.js
20180108013824-create-activity-likes.js
20180108210243-create-activity.js
20180108210540-create-activity-likes.js
20180108210754-create-rating.js
20180108210229-create-favorite.js
20180309220357-create-favorite.js
20180309221704-create-favorite.js
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: username
--

COPY "Users" (id, mail, password, username, sex, age, city, "yearOfLiving", hometown, school, major, language, hobby, personality, "createdAt", "updatedAt") FROM stdin;
31	edf@gmail.com	$2a$10$M6I4xjvmrYVYEugkvnKt7ekr4bBZeB2iNhn6glA1hfNYatm2GF3cW	哥斯拉	男	42	旧金山	20	青岛	加大伯克利	机械工程	英语，丹麦语，法语，普通话	汽车	温和	2018-03-12 14:54:29.345-07	2018-03-12 14:57:38.416-07
33	wangbeile@gmail.com	$2a$10$wk3BcD5SOM/l1GrC3JxUce4N.EokikS.hN6.cU1/.BonNjhze903S	王贝勒	男	35	敦煌	20	敦煌	西南大学	计算机科学	英语，普通话	计算机	嘻嘻哈哈	2018-03-12 15:04:25.404-07	2018-03-12 15:09:43.098-07
32	caogege@gmail.com	$2a$10$1/4As.4pdo2zCCeMiSIRzOLuB0ljGHo/LRuUmEIddsUwzkgx5DKtq	曹格格	男	35	珠海	20	珠海	珠海大学	计算机科学	英语，普通话	吃喝玩乐	闷骚	2018-03-12 14:58:51.371-07	2018-03-12 15:11:32.387-07
34	1234@gmail.com	$2a$10$.zZUBCsc9IsjYFVwp28WW.ITa693zFI7gUFhVHDTO8q.muoW2ugge	王贝勒	男	35	敦煌	20	敦煌	西南大学	计算机科学	英语，普通话	计算机	嘻嘻哈哈	2018-03-12 15:13:46.703-07	2018-03-12 15:14:08.809-07
36	test123@gmail.com	$2a$10$iCIBYIzNk7OpBga6YEBehuSBUU/WPcYli8zke5Rq2Znl1rCHMoMs2	理工狗	男	18	a	12	大连	大连理工大学	计算机科学	普通话，大连话	逛公园	内向	2018-03-12 22:47:15.154-07	2018-03-14 16:35:26.669-07
35	corgi@gmail.com	$2a$10$X13eEz1nWte85ytpIBGa2u3h4RWEkgpr3VnJ20PAUIB.uGvpyct16	柯基的守护者	女	33	21	10	大连	大连大学	经贸日语	普通话，英语，日语	柯基	哈哈哈哈哈	2018-03-12 15:17:09.469-07	2018-03-16 18:26:22.652-07
\.


--
-- Data for Name: WishLikes; Type: TABLE DATA; Schema: public; Owner: username
--

COPY "WishLikes" (id, "numOfLikes", "userMarkers", "createdAt", "updatedAt", "wishId") FROM stdin;
10	0		2018-03-13 14:47:38.441-07	2018-03-13 14:47:38.441-07	10
11	0		2018-03-13 15:56:42.533-07	2018-03-13 15:56:42.533-07	11
\.


--
-- Data for Name: Wishes; Type: TABLE DATA; Schema: public; Owner: username
--

COPY "Wishes" (id, location, departdate, finishdate, budget, services, "createdAt", "updatedAt", "userId", note) FROM stdin;
10	三亚市 海南省	05 Apr 2018 2:47	12 Apr 2018 2:47	2000	{徒步旅行,汽车接送}	2018-03-13 14:47:38.333-07	2018-03-13 16:57:44.851-07	35	向导必须是男的，年龄在35岁左右。对地道的海鲜饭店很熟悉。会说普通话。本人不懂粤语。
11	西安市 陕西省	11 Apr 2018 3:56	26 Apr 2018 3:56	1500	{徒步旅行}	2018-03-13 15:56:42.428-07	2018-03-14 12:20:31.844-07	35	本地向导对西安美食了如指掌：肉夹馍，凉皮，各种面食等。对古迹的了解，比如兵马俑，各种历史遗迹等。
\.


--
-- Name: Activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: username
--

SELECT pg_catalog.setval('"Activities_id_seq"', 28, true);


--
-- Name: ActivityLikes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: username
--

SELECT pg_catalog.setval('"ActivityLikes_id_seq"', 40, true);


--
-- Name: Favorites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: username
--

SELECT pg_catalog.setval('"Favorites_id_seq"', 10, true);


--
-- Name: Ratings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: username
--

SELECT pg_catalog.setval('"Ratings_id_seq"', 54, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: username
--

SELECT pg_catalog.setval('"Users_id_seq"', 36, true);


--
-- Name: WishLikes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: username
--

SELECT pg_catalog.setval('"WishLikes_id_seq"', 13, true);


--
-- Name: Wishes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: username
--

SELECT pg_catalog.setval('"Wishes_id_seq"', 13, true);


--
-- Name: Activities Activities_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY "Activities"
    ADD CONSTRAINT "Activities_pkey" PRIMARY KEY (id);


--
-- Name: ActivityLikes ActivityLikes_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY "ActivityLikes"
    ADD CONSTRAINT "ActivityLikes_pkey" PRIMARY KEY (id);


--
-- Name: Favorites Favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY "Favorites"
    ADD CONSTRAINT "Favorites_pkey" PRIMARY KEY (id);


--
-- Name: Ratings Ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY "Ratings"
    ADD CONSTRAINT "Ratings_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY "SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: WishLikes WishLikes_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY "WishLikes"
    ADD CONSTRAINT "WishLikes_pkey" PRIMARY KEY (id);


--
-- Name: Wishes Wishes_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY "Wishes"
    ADD CONSTRAINT "Wishes_pkey" PRIMARY KEY (id);


--
-- Name: Activities Activities_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY "Activities"
    ADD CONSTRAINT "Activities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"(id) ON DELETE CASCADE;


--
-- Name: ActivityLikes ActivityLikes_activityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY "ActivityLikes"
    ADD CONSTRAINT "ActivityLikes_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activities"(id) ON DELETE CASCADE;


--
-- Name: Favorites Favorites_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY "Favorites"
    ADD CONSTRAINT "Favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"(id) ON DELETE CASCADE;


--
-- Name: Ratings Ratings_activityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY "Ratings"
    ADD CONSTRAINT "Ratings_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activities"(id) ON DELETE CASCADE;


--
-- Name: WishLikes WishLikes_wishId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY "WishLikes"
    ADD CONSTRAINT "WishLikes_wishId_fkey" FOREIGN KEY ("wishId") REFERENCES "Wishes"(id) ON DELETE CASCADE;


--
-- Name: Wishes Wishes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY "Wishes"
    ADD CONSTRAINT "Wishes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

