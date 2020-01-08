<?php defined('BASEPATH') OR exit('No direct script access allowed');

use Restserver\Libraries\REST_Controller;

require APPPATH . '/libraries/REST_Controller.php';
 
class Users extends \Restserver\Libraries\REST_Controller
{
    public function __construct() {
        parent::__construct();
        // Load User Model
        header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header('Access-Control-Allow-Headers: Accept,Accept-Language,Content-Language,Content-Type');
        $this->load->model('user_model', 'UserModel');
    }

    /**
     * User Register
     * --------------------------
     * @param: fullname
     * @param: username
     * @param: email
     * @param: password
     * --------------------------
     * @method : POST
     * @link : api/user/register
     */
    public function register_post()
    {
        $_POST = $this->security->xss_clean($_POST);
        # Form Validation
        $this->form_validation->set_rules('fullname', 'Full Name', 'trim|required|max_length[50]');
        $this->form_validation->set_rules('username', 'Username', 'trim|required|is_unique[users.username]|alpha_numeric|max_length[20]',
            array('is_unique' => 'This %s already exists please enter another username')
        );
        $this->form_validation->set_rules('email', 'Email', 'trim|required|valid_email|max_length[80]|is_unique[users.email]',
            array('is_unique' => 'This %s already exists please enter another email address')
        );
        $this->form_validation->set_rules('password', 'Password', 'trim|required|max_length[100]');
        if ($this->form_validation->run() == FALSE)
        {
            // Form Validation Errors
            $message = array(
                'status' => false,
                'error' => $this->form_validation->error_array(),
                'message' => validation_errors()
            );

            $this->response($message, REST_Controller::HTTP_NOT_FOUND);
        }
        else
        {
            $insert_data = [
                'full_name' => $this->input->post('fullname', TRUE),
                'email' => $this->input->post('email', TRUE),
                'username' => $this->input->post('username', TRUE),
                'password' => md5($this->input->post('password', TRUE)),
                'created_at' => time(),
                'updated_at' => time(),
            ];

            // Insert User in Database
            $output = $this->UserModel->insert_user($insert_data);
            if ($output > 0 AND !empty($output))
            {
                // Success 200 Code Send
                $message = [
                    'status' => true,
                    'message' => "User registration successful"
                ];
                $this->response($message, REST_Controller::HTTP_OK);
            } else
            {
                // Error
                $message = [
                    'status' => FALSE,
                    'message' => "Not Register Your Account."
                ];
                $this->response($message, REST_Controller::HTTP_NOT_FOUND);
            }
        }
    }


    /**
     * User Login API
     * --------------------
     * @param: username
     * @param: password
     * --------------------------
     * @method : POST
     * @link: api/user/login
     */
    public function login_post()
    {
        header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header('Access-Control-Allow-Headers: Accept,Accept-Language,Content-Language,Content-Type');
        
        $formdata = json_decode(file_get_contents('php://input'));

            $username = $formdata->username;
            $password = $formdata->password;

            // Load Login Function
            $output = $this->UserModel->user_login($username, $password);

            if (!empty($output) AND $output != FALSE)
            {
                $return_data = [
                    'user_id' => $output->user_id,
                    'token' => $output->Token,
                ];
                // Login Success
                $message = [
                    'status' => true,
                    'data' => $return_data,
                    'message' => "User login successful"
                ];
                $this->response($message, REST_Controller::HTTP_OK);
            } else
            {
                // Login Error
                $message = [
                    'status' => FALSE,
                    'message' => "Invalid Username or Password"
                ];
                $this->response($message, REST_Controller::HTTP_NOT_FOUND);
            }
        
    }

        /**
     * User Data API
     * --------------------
     * @param: user_id
     * --------------------------
     * @method : POST
     * @link: api/user/userinfos
     */
    public function userinfos_post()
    {   
        $formdata = json_decode(file_get_contents('php://input'));
        $isValidToken = $this->UserModel->checkToken($formdata->token);
        if($isValidToken) {
            // Load User data Function
            $output = $this->UserModel->user_data($formdata->user_id);
            if (!empty($output) AND $output != FALSE)
            {
                $return_data = [
                    'FirstName' => $output->Nom,
                    'LastName' => $output->Prenom,
                    'CNI' => $output->Cin,
                    'Immatriculation' => $output->Immatriculation,
                    'dateNaissance' => $output->Naissance,
                ];
                // Login Success
                $message = [
                    'status' => true,
                    'data' => $return_data,
                    'message' => "User data successful"
                ];
                $this->response($message, REST_Controller::HTTP_OK);
            } else
            {
                // User Error
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