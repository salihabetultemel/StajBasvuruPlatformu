--
-- PostgreSQL database dump
--

-- Dumped from database version 15.11
-- Dumped by pg_dump version 15.11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255),
    password text,
    ogrenci_no character varying(12),
    ad_soyad character varying(100),
    tc_kimlik_no character varying(11),
    bolum character varying(100),
    sinif character varying(10),
    profil_resmi text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, ogrenci_no, ad_soyad, tc_kimlik_no, bolum, sinif, profil_resmi) FROM stdin;
4	tarıkyuce@gmail.com	$2b$10$5luMgH9PB1BuK4a2J5BWRutCA.aDrH8BGP/jPg0VlA1zksQWr5ute	\N	\N	\N	\N	\N	\N
5	betultemell13@gmail.com	$2b$10$vb1cuxR8tvebQVirorxWM.IhODms/k4yKFm0dRR43DlObNVLR1F8K	202113895623	saliha betül temel	\N	\N	\N	\N
6	dilaraogz@icloud.com	$2b$10$SsmtgtZcmhD9QAMzsyvHYeqNMNnn5Dvp/IxAXQtuMRUZBIzWB7l4a	123615416132	dilara oğuz 	\N	\N	\N	\N
7	betultemell133@gmail.com	$2b$10$ADFgTa5qbSOAEbBygTnzme8AYA8LBeQBanQ0S6yD7/8ep8YzsIr0G	456123659847	betül temel	33625489569	bilg müh	4	/uploads/1745411680044_ChatGPT Image 4 Nis 2025 15_48_05.png
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- PostgreSQL database dump complete
--

