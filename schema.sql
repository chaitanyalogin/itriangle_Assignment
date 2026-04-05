CREATE TABLE public.roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(255),
    is_active BOOLEAN
);

CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    is_active BOOLEAN,
    role_id INTEGER NOT NULL,
    CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id)
);

CREATE TABLE public.approval_workflows (
    id SERIAL PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    approval_required BOOLEAN DEFAULT true NOT NULL,
    auto_publish BOOLEAN DEFAULT false NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP
);

CREATE TABLE public.approval_workflow_rules (
    id SERIAL PRIMARY KEY,
    workflow_id INTEGER NOT NULL,
    condition_type VARCHAR(50) NOT NULL,
    condition_value VARCHAR(100) NOT NULL,
    approval_required BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    CONSTRAINT approval_workflow_rules_workflow_id_fkey 
    FOREIGN KEY (workflow_id) REFERENCES public.approval_workflows(id) ON DELETE CASCADE
);

CREATE TABLE public.approval_levels (
    id SERIAL PRIMARY KEY,
    rule_id INTEGER NOT NULL,
    level_no INTEGER NOT NULL,
    approver_type VARCHAR(20) NOT NULL,
    approver_user_id INTEGER,
    approver_role_id INTEGER,
    is_mandatory BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    CONSTRAINT approval_levels_rule_id_fkey 
    FOREIGN KEY (rule_id) REFERENCES public.approval_workflow_rules(id) ON DELETE CASCADE,
    CONSTRAINT approval_levels_approver_user_id_fkey 
    FOREIGN KEY (approver_user_id) REFERENCES public.users(id),
    CONSTRAINT approval_levels_approver_role_id_fkey 
    FOREIGN KEY (approver_role_id) REFERENCES public.roles(id)
);

CREATE TABLE public.approval_requests (
    id SERIAL PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL,
    entity_id BIGINT NOT NULL,
    action VARCHAR(50) NOT NULL,
    workflow_id INTEGER NOT NULL,
    current_level INTEGER DEFAULT 1 NOT NULL,
    status VARCHAR(30) DEFAULT 'PENDING' NOT NULL,
    created_by INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    CONSTRAINT approval_requests_workflow_id_fkey 
    FOREIGN KEY (workflow_id) REFERENCES public.approval_workflows(id),
    CONSTRAINT approval_requests_created_by_fkey 
    FOREIGN KEY (created_by) REFERENCES public.users(id)
);

CREATE TABLE public.approval_request_steps (
    id SERIAL PRIMARY KEY,
    approval_request_id INTEGER NOT NULL,
    level_no INTEGER NOT NULL,
    approver_user_id INTEGER NOT NULL,
    status VARCHAR(30) DEFAULT 'PENDING',
    action_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT now(),
    CONSTRAINT approval_request_steps_approval_request_id_fkey 
    FOREIGN KEY (approval_request_id) REFERENCES public.approval_requests(id) ON DELETE CASCADE,
    CONSTRAINT approval_request_steps_approver_user_id_fkey 
    FOREIGN KEY (approver_user_id) REFERENCES public.users(id)
);

CREATE TABLE public.approval_actions (
    id SERIAL PRIMARY KEY,
    approval_request_id INTEGER NOT NULL,
    level_no INTEGER NOT NULL,
    action VARCHAR(20) NOT NULL,
    action_by INTEGER NOT NULL,
    remarks TEXT,
    action_at TIMESTAMP DEFAULT now(),
    CONSTRAINT approval_actions_approval_request_id_fkey 
    FOREIGN KEY (approval_request_id) REFERENCES public.approval_requests(id) ON DELETE CASCADE,
    CONSTRAINT approval_actions_action_by_fkey 
    FOREIGN KEY (action_by) REFERENCES public.users(id)
);

CREATE TABLE public.purchase_requests (
    id SERIAL PRIMARY KEY,
    pr_number VARCHAR(50),
    customer_name VARCHAR(255),
    product_name VARCHAR(255),
    quantity INTEGER,
    unit_price NUMERIC,
    total_price NUMERIC,
    status VARCHAR(30) DEFAULT 'PENDING',
    created_by INTEGER,
    created_at TIMESTAMP DEFAULT now(),
    CONSTRAINT purchase_requests_created_by_fkey 
    FOREIGN KEY (created_by) REFERENCES public.users(id)
);