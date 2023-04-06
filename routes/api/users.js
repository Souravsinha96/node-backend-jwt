const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router
  .route('/')
  .get(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    usersController.getAllUsers
  );

router
  .route('/:id')
  .get(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    usersController.getUser
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.user),
    usersController.updateUser
  )
  .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router
  .route('/editRole')
  .put(verifyRoles(ROLES_LIST.Admin), usersController.editUserRole);

module.exports = router;
