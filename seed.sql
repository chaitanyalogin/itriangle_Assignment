INSERT INTO roles(role_name,is_active)
VALUES
('Employee',true),
('Manager',true);

INSERT INTO users(name,is_active,role_id)
VALUES
('John',true,1),
('Manager1',true,2);

INSERT INTO approval_workflows(entity_type,action)
VALUES('PR','CREATE');

INSERT INTO approval_workflow_rules(workflow_id,condition_type,condition_value)
VALUES(1,'ROLE','Employee');

INSERT INTO approval_levels(rule_id,level_no,approver_type,approver_user_id)
VALUES(1,1,'USER',2);