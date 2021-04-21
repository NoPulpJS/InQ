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

-- add email to user details?

CREATE TABLE public.users (
  "_id" serial,
  "name" varchar NOT NULL,
  "photo_url" varchar,
  "email" varchar,
  CONSTRAINT "users_pk" PRIMARY KEY ("_id")
);

CREATE TABLE public.questions (
  "_id" serial,
  "question" varchar NOT NULL,
  "created_by" int NOT NULL,
  "created_at" date DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "questions_pk" PRIMARY KEY ("_id")
);

CREATE TABLE public.companies (
  "_id" serial,
  "company" varchar NOT NULL,
  CONSTRAINT "companies_pk" PRIMARY KEY ("_id")
);

CREATE TABLE public.categories (
  "_id" serial,
  "category" varchar NOT NULL,
  CONSTRAINT "public_pk" PRIMARY KEY ("_id")
);

CREATE TABLE public.questions_in_categories (
  "_id" serial,
  "question_id" bigint NOT NULL,
  "category_id" bigint NOT NULL,
  CONSTRAINT "questions_in_categories_pk" PRIMARY KEY ("_id")
);

CREATE TABLE public.questions_in_companies (
  "_id" serial,
  "question_id" bigint NOT NULL,
  "company_id" bigint NOT NULL,
  CONSTRAINT "questions_in_companies_pk" PRIMARY KEY ("_id")
);

CREATE TABLE public.categories_in_companies (
  "_id" serial,
  "category_id" bigint NOT NULL,
  "company_id" bigint NOT NULL,
  CONSTRAINT "categories_in_companies_pk" PRIMARY KEY ("_id")
);

ALTER TABLE public.questions ADD CONSTRAINT "questions_fk0" FOREIGN KEY ("created_by") REFERENCES public.users("_id");

ALTER TABLE public.questions_in_categories ADD CONSTRAINT "questions_in_categories_fk0" FOREIGN KEY ("question_id") REFERENCES public.questions("_id");
ALTER TABLE public.questions_in_categories ADD CONSTRAINT "questions_in_categories_fk1" FOREIGN KEY ("category_id") REFERENCES public.categories("_id");

ALTER TABLE public.questions_in_companies ADD CONSTRAINT "public.questions_in_companies_fk0" FOREIGN KEY ("question_id") REFERENCES public.questions("_id");
ALTER TABLE public.questions_in_companies ADD CONSTRAINT "public.questions_in_companies_fk1" FOREIGN KEY ("company_id") REFERENCES public.companies("_id");

ALTER TABLE public.categories_in_companies ADD CONSTRAINT "public.categories_in_companies_fk0" FOREIGN KEY ("category_id") REFERENCES public.categories("_id");
ALTER TABLE public.categories_in_companies ADD CONSTRAINT "public.categories_in_companies_fk1" FOREIGN KEY ("company_id") REFERENCES public.companies("_id");