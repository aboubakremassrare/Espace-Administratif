<?php defined('BASEPATH') OR exit('No direct script access allowed');

use Restserver\Libraries\REST_Controller;

require APPPATH . '/libraries/REST_Controller.php';
 
class Departements extends \Restserver\Libraries\REST_Controller
{
    public function __construct() {
        parent::__construct();
        header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header('Access-Control-Allow-Headers: Accept,Accept-Language,Content-Language,Content-Type');
        $this->load->model('user_model', 'UserModel');
        $this->load->model('departement_model', 'DepartementModel');
    }
        /**
     * User Data API
     * --------------------
     * @param: user_id
   
     * --------------------------
     * @method : POST
     * @link: api/user/departements
     */
    public function departements_post()
    {
        $formdata = json_decode(file_get_contents('php://input'));
        $isValidToken = $this->UserModel->checkToken($formdata->token);
        if($isValidToken){
            // Load User data Function
            $output = $this->DepartementModel->departement_data();
            if (!empty($output) AND $output != FALSE)
            {
                //  Success
                $message = [
                    'status' => true,
                    'data' => $output,
                    'message' => " data successful"
                ];
                $this->response($message, REST_Controller::HTTP_OK);
            }else{
                //  Error
                $message = [
                    'status' => FALSE,
                    'message' => "Invalid Informations"
                ];
                $this->response($message, REST_Controller::HTTP_NOT_FOUND);
            }
        }//end isvalid token
        else{
            $message = [
                'status' => FALSE,
                'message' => "Invalid Token"
            ];
            $this->response($message, REST_Controller::HTTP_NOT_FOUND);
        }
        
    }


}