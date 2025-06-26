CREATE TYPE jobfinder.jobtype AS ENUM ('full_time', 'part_time', 'contract', 'internship');
CREATE TYPE jobfinder.jobstatus AS ENUM ('open', 'closed', 'archived');

CREATE TYPE jobfinder.jobapplicationsrejectedcause AS ENUM ('not_qualified', 'overqualified', 'position_closed', 'no_response', 'lack_of_experience', 'other');
CREATE TYPE jobfinder.jobapplicationstatus AS ENUM ('applied', 'interviewing', 'offered', 'hired', 'rejected');

CREATE TABLE IF NOT EXISTS companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    title VARCHAR(512) NOT NULL,
    description TEXT NOT NULL,
    type jobfinder.jobtype NOT NULL,
    status jobfinder.jobstatus NOT NULL,
    url VARCHAR(512) NOT NULL,
    location VARCHAR(256) NOT NULL,
    salary_amount INTEGER,
    salary_min_amount INTEGER,
    salary_max_amount INTEGER,
    salary_currency VARCHAR(16),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS job_applications (
    id SERIAL PRIMARY KEY,
    job_id INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    status jobfinder.jobapplicationstatus NOT NULL,
    rejected_cause jobfinder.jobapplicationsrejectedcause,
    specified_rejected_cause VARCHAR(512),
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE companies ADD CONSTRAINT unique_company_name UNIQUE (name);