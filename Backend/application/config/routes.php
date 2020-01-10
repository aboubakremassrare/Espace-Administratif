<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
// User API Routes
$route['api/user/register'] = 'api/users/register';
$route['api/user/login'] = 'api/users/login';
$route['api/user/userinfos'] = 'api/users/userinfos';
//Departements APi
$route['api/departement/departements'] = 'api/departements/departements';
//interimes APi
$route['api/interime/interimes'] = 'api/interimes/interimes';
//Demandes APi
$route['api/demandes/attestation'] = 'api/demandes/attestation';
$route['api/demandes/avance'] = 'api/demandes/avance';
$route['api/demandes/autorisation'] = 'api/demandes/autorisation';
$route['api/demandes/conge'] = 'api/demandes/conge';


//$route['api/user/user']='api/user/userData';
$route['api/demandes/sendmail']='api/demandes/sendmail';

