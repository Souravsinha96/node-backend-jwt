const express = require('express');
const router = express.Router();
const rolesController = require('../../controllers/rolesController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router
  .route('/')
  .get(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    rolesController.getAllRoles
  );

module.exports = router;
