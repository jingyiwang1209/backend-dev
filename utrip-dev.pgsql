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
    images text[],
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
    "userId" integer
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

COPY "Activities" (id, theme, location, departdate, finishdate, budget, services, story, images, "createdAt", "updatedAt", "userId") FROM stdin;
7	大连城市风光游	大连市 辽宁省	23 Feb 2018 6:16	28 Feb 2018 6:16	5000	{徒步旅行,汽车接送,购物打折}	我在大连生活了10年。这里的一山一水一草一木都充满了灵性。大连是一个热情，开方，时尚的城市。海纳百川，兼容并蓄。	{}	2018-02-20 18:18:16.284-08	2018-02-20 18:18:16.284-08	6
8	珠海城市风光7日游	珠海市 广东省	16 Feb 2018 6:23	28 Feb 2018 6:23	100000	{徒步旅行,汽车接送}	我在珠海长大，生活。珠海就像一颗璀璨的明珠，在中国的南方熠熠生辉。白天的珠海车水马龙，穿梭入流。傍晚的珠海华灯初上，光彩夺目。我爱这里的一切。	{}	2018-02-20 18:23:53.967-08	2018-02-20 18:23:53.967-08	7
9	敦煌丝绸之路之旅	敦煌市 甘肃省	23 Feb 2018 7:14	03 Mar 2018 7:14	6500	{徒步旅行}	我在敦煌陆续生活了大概有2年。敦煌是一个神秘古老的城市。作为一个古老的丝绸之路的城市，敦煌如今依然吸引着世界上各个国家的游客。我对敦煌的熟悉，会带领你绕过各种旅游陷阱，我只带你去鲜为人知，最地道的地方。	{}	2018-02-20 19:18:38.897-08	2018-02-20 19:18:38.897-08	8
12	北京三日游	北京市 北京市	23 Mar 2018 9:45	31 Mar 2018 9:45	5000	{徒步旅行,购物打折}	我在北京呆了2年，对北京文化，景点念念不忘。北京的景点大气辉煌，充满历史感。我一定会带你领略中华在过去的帝国风采。	{http://localhost:3000/a8a47ac8-30e7-4de6-b394-a03f9b0996c3}	2018-03-01 09:48:00.606-08	2018-03-01 09:48:00.606-08	9
\.


--
-- Data for Name: ActivityLikes; Type: TABLE DATA; Schema: public; Owner: username
--

COPY "ActivityLikes" (id, "numOfLikes", "userMarkers", "createdAt", "updatedAt", "activityId") FROM stdin;
22	1	9;	2018-02-20 18:23:56.261-08	2018-02-24 18:42:27.2-08	8
21	2	9;6;	2018-02-20 18:18:21.304-08	2018-02-24 18:42:31.242-08	7
23	2	9;6;	2018-02-20 19:18:40.629-08	2018-02-24 18:42:32.895-08	9
26	0		2018-03-01 09:48:00.73-08	2018-03-01 09:48:00.73-08	12
\.


--
-- Data for Name: Ratings; Type: TABLE DATA; Schema: public; Owner: username
--

COPY "Ratings" (id, feedback, "numOfStars", "userId", "createdAt", "updatedAt", "activityId") FROM stdin;
34	Robert非常专业，尤其对地道的海鲜美食非常有研究。	4	7	2018-02-20 18:24:31.334-08	2018-02-20 18:24:31.334-08	7
35	王贝勒对敦煌的熟悉堪称达人！	5	7	2018-02-20 19:20:08.805-08	2018-02-20 19:20:08.805-08	9
36	Robert人很热情，可是中文不太好。。。。	3	8	2018-02-20 19:21:47.22-08	2018-02-20 19:21:47.22-08	7
42	王贝勒对敦煌文化了如指掌，旅行的同时又掌握了很多知识	4	6	2018-02-20 20:37:23.677-08	2018-02-20 20:37:23.677-08	9
43		3	6	2018-02-21 22:59:37.789-08	2018-02-21 22:59:37.789-08	8
45	just soso	4	6	2018-02-24 18:41:36.343-08	2018-02-24 18:41:36.343-08	7
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
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: username
--

COPY "Users" (id, mail, password, username, sex, age, city, "yearOfLiving", hometown, school, major, language, hobby, personality, "createdAt", "updatedAt") FROM stdin;
7	caogege@gmail.com	$2a$10$r0ID2t04WeAdU6UnCithCOxjN6Y1X0tCDYd0VrVnZJ04HdoaLqVhG	曹格格	男	36	珠海	20	珠海	深圳大学	计算机	良好	吃	闷骚	2018-02-20 18:20:23.031-08	2018-02-26 14:20:56.885-08
25	jingyi@gmail.com	zxcvbn	jing	女	21	21	6	大连	金门大学	项目管理	尚可	吃喝玩乐	内向	2018-02-25 16:23:31.003-08	2018-02-25 18:18:12.768-08
8	sean@abc.com	$2a$10$KBTpPKjJW96x88SsB97fQO4vctrapPinH6serpU3aDTPp3TCqNoUa	王贝勒	男	33	苏州	20	苏州	苏州大学	计算机	良好	旅游	温和	2018-02-20 19:16:42.63-08	2018-02-26 14:21:19.271-08
9	corgi@gmail.com	$2a$10$ORB/d9c9rXlTiuzZ8RkrCOm6/qFPfjxVOi7Ejoho4UX8lm/pu80pm	柯基的守护者	女	35	北京	5	大连	大连大学	日语	良好	柯基	内向	2018-02-22 16:05:35.095-08	2018-02-26 16:09:37.024-08
6	robert@gmail.com	$2a$10$bqeLmIeOYu/prAGamSP0s.cIuLyVpktpqdeCsXCa0KVpRASQhzFlW	哥斯	男	40	San Francisco	15	旧金山	加大伯克利分校	机械工程，材料科学	良好	汽车	快乐	2018-01-01 22:43:37.753-08	2018-02-27 15:27:19.849-08
\.


--
-- Data for Name: WishLikes; Type: TABLE DATA; Schema: public; Owner: username
--

COPY "WishLikes" (id, "numOfLikes", "userMarkers", "createdAt", "updatedAt", "wishId") FROM stdin;
3	0		2018-02-21 11:34:59.45-08	2018-02-21 11:34:59.45-08	3
7	0		2018-02-21 19:53:43.415-08	2018-02-21 19:53:43.415-08	7
8	0		2018-02-24 18:47:45.668-08	2018-02-24 18:47:45.668-08	8
\.


--
-- Data for Name: Wishes; Type: TABLE DATA; Schema: public; Owner: username
--

COPY "Wishes" (id, location, departdate, finishdate, budget, services, "createdAt", "updatedAt", "userId") FROM stdin;
3	唐山市 河北省	23 Feb 2018 11:15	01 Mar 2018 11:15	2000	{徒步旅行}	2018-02-21 11:15:53.875-08	2018-02-21 11:15:53.875-08	6
7	丽江市 云南省	03 Mar 2018 7:53	15 Mar 2018 7:53	15000	{徒步旅行,汽车接送,购物打折}	2018-02-21 19:53:43.325-08	2018-02-21 19:53:43.325-08	6
8	深圳市 广东省	28 Feb 2018 6:47	08 Mar 2018 3:00	2000	{徒步旅行,汽车接送}	2018-02-24 18:47:45.59-08	2018-02-24 18:47:45.59-08	6
\.


--
-- Name: Activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: username
--

SELECT pg_catalog.setval('"Activities_id_seq"', 14, true);


--
-- Name: ActivityLikes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: username
--

SELECT pg_catalog.setval('"ActivityLikes_id_seq"', 28, true);


--
-- Name: Ratings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: username
--

SELECT pg_catalog.setval('"Ratings_id_seq"', 45, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: username
--

SELECT pg_catalog.setval('"Users_id_seq"', 25, true);


--
-- Name: WishLikes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: username
--

SELECT pg_catalog.setval('"WishLikes_id_seq"', 8, true);


--
-- Name: Wishes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: username
--

SELECT pg_catalog.setval('"Wishes_id_seq"', 8, true);


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

