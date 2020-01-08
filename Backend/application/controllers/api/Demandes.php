<?php defined('BASEPATH') OR exit('No direct script access allowed');

use Restserver\Libraries\REST_Controller;

require APPPATH . '/libraries/REST_Controller.php';
 
class Demandes extends \Restserver\Libraries\REST_Controller
{
    public function __construct() {
        parent::__construct();
        header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header('Access-Control-Allow-Headers: Accept,Accept-Language,Content-Language,Content-Type');
        $this->load->model('user_model', 'UserModel');
        $this->load->model('attestation_model', 'AttestationModel');
        $this->load->model('avance_model', 'AvanceModel');
        $this->load->model('autorisation_model', 'AutorisationModel');


    }

        /**
     * User Data API
     * --------------------
     * @param: user_id
   
     * --------------------------
     * @method : POST
     * @link: api/demandes/attestation
     */

    public function attestation_post()
    {
       
        $formdata = json_decode(file_get_contents('php://input'));
        $isValidToken = $this->UserModel->checkToken($this->input->post('token'));
        /* Si le token est valide */
        if($isValidToken) {
            $utilisateur=$this->input->post('user_id');
            $id_attestation=$this->input->post('attestation_id');
            $attestation = array();
            $attestation['user_id'] = $utilisateur;
            $attestation['id_attestation'] = $id_attestation;
            $last_id=$this->AttestationModel->ajouter_attestation($attestation);
            /*recuperer les information de l'utilisateur */
            $data=array();
            $attestation_query=$this->AttestationModel->getAttestationNom($id_attestation);
            $utilisateur_query=$this->UserModel->user_data($utilisateur);
                          }//end isvalid token

        else{
            $message = [
                'status' => FALSE,
                'message' => "Invalid Token"
            ];
            $this->response($message, REST_Controller::HTTP_NOT_FOUND);
        }
    }


    
        /**
     * User Data API
     * --------------------
     * @param: user_id montant
   
     * --------------------------
     * @method : POST
     * @link: api/demandes/avance
     */

    public function avance_post()
    {
        $formdata = json_decode(file_get_contents('php://input'));
        $isValidToken = $this->UserModel->checkToken($this->input->post('token'));
        /* Si le token est valide */
        if($isValidToken) {
            $avance=array();
            $avance['user_id'] = $this->input->post('user_id');
            $avance['montant'] = $this->input->post('avance');
            $last_id=$this->AvanceModel->ajouter_avance($avance);
                          }//end isvalid token
        else{
            $message = [
                'status' => FALSE,
                'message' => "Invalid Token"
            ];
            $this->response($message, REST_Controller::HTTP_NOT_FOUND);
        }
    }
    
            /**
     * User Data API
     * --------------------
     * @param: user_id jour heure motif
   
     * --------------------------
     * @method : POST
     * @link: api/demandes/autorisation
     */

    public function autorisation_post()
    {
        $formdata = json_decode(file_get_contents('php://input'));
        $isValidToken = $this->UserModel->checkToken($this->input->post('token'));
        /* Si le token est valide */
        if($isValidToken) {
            $autorisation=array();
            $autorisation['user_id'] = $this->input->post('user_id');
            $autorisation['Jour'] = $this->input->post('jour');
            $autorisation['Heure_depart'] = $this->input->post('heureDebut');
            $autorisation['Heure_retour'] = $this->input->post('heureFin');
            $autorisation['motif'] = $this->input->post('motif');
            $last_id=$this->AutorisationModel->ajouter_autorisation($autorisation);
                          }//end isvalid token
        else{
            $message = [
                'status' => FALSE,
                'message' => "Invalid Token"
            ];
            $this->response($message, REST_Controller::HTTP_NOT_FOUND);
        }
    }

        public function sendmail_post(){

                $formdata = json_decode(file_get_contents('php://input'));
                $isValidToken = $this->UserModel->checkToken($this->input->post('token'));
                /* Si le token est valide */
                if($isValidToken) {
                    $to = 'aboubakremassrare@gmail.com'; 
                    $from = 'sender@example.com'; 
                    $fromName = 'Aboubakre'; 
                    $subject = $this->input->post('sujet'); 
                    $typeDemande=$this->input->post('typeDemande');
                    $utilisateur=$this->input->post('user_id');
                    $utilisateur_query=$this->UserModel->user_data($utilisateur);
                    switch($typeDemande){
                        case 'ATTESTATION':
                            $htmlContent = ' 
                                    <html> 
                                    <head> 
                                        <title>Welcome to ADm</title> 
                                    </head> 
                                    <body> 
                                    <h1>Espace Administratif</h1> 
                                        <table cellspacing="0" style="border: 2px dashed #FB4314; width: 100%;"> 
                                            <tr> 
                                                <th>Name:</th><td>'.$utilisateur_query->Nom.'--'.$utilisateur_query->Prenom.'</td> 
                                            </tr> 
                                            <tr style="background-color: #e0e0e0;"> 
                                                <th>Email:</th><td>'.$utilisateur_query->email.'</td> 
                                            </tr> 
                                            <tr> 
                                                <th>Demande:</th><td><a href="">'.$subject.'</a></td> 
                                            </tr> 
                                        </table> 
                                    </body> 
                                    </html>'; 
                        break;
                        case 'AVANCE':
                            $avance=$this->input->post('avance');
                            $htmlContent = ' 
                                    <html> 
                                    <head> 
                                        <title>Welcome to ADm</title> 
                                    </head> 
                                    <body> 
                                    <h1>Espace Administratif</h1>                                         <table cellspacing="0" style="border: 2px dashed #FB4314; width: 100%;"> 
                                            <tr> 
                                                <th>Name:</th><td>'.$utilisateur_query->Nom.'--'.$utilisateur_query->Prenom.'</td> 
                                            </tr> 
                                            <tr style="background-color: #e0e0e0;"> 
                                                <th>Email:</th><td>'.$utilisateur_query->email.'</td> 
                                            </tr> 
                                            <tr> 
                                                <th>Demande:</th><td><a href="">'.$subject.'</a></td> 
                                            </tr> 
                                            <tr> 
                                            <th>Montant :</th><td><a href="">'.$avance.' DH</a></td> 
                                            </tr>
                                        </table> 
                                    </body> 
                                    </html>'; 
                        break;
                        case 'AUTORISATION':
                            $jour=$this->input->post('jour');
                            $heureDebut=$this->input->post('heureDebut');
                            $heureFin=$this->input->post('heureFin');
                            $motif=$this->input->post('motif');
                            $htmlContent = '
                                    <html> 
                                    <head> 
                                        <title>Welcome to ADm</title> 
                                    </head> 
                                    <body> 
                                        <h1>Espace Administratif</h1> 
                                        <table cellspacing="0" style="border: 2px dashed #FB4314; width: 100%;"> 
                                            <tr> 
                                                <th>Name:</th><td>'.$utilisateur_query->Nom.'--'.$utilisateur_query->Prenom.'</td> 
                                            </tr> 
                                            <tr style="background-color: #e0e0e0;"> 
                                                <th>Email:</th><td>'.$utilisateur_query->email.'</td> 
                                            </tr> 
                                            <tr> 
                                                <th>Demande:</th><td><a href="">'.$subject.'</a></td> 
                                            </tr> 
                                            <tr> 
                                            <th>jour :</th><td><a href="">'.$jour.' DH</a></td> 
                                            </tr>
                                            <tr> 
                                            <th>Heure:</th><td>'.$heureDebut.'-----'.$heureFin.'</td> 
                                            </tr>
                                            <tr> 
                                            <th>Motif :</th><td><a href="">'.$motif.' </a></td> 
                                            </tr>
                                        </table> 
                                    </body> 
                                    </html>';
                        break;
                    }
                    $headers = "MIME-Version: 1.0" . "\r\n"; 
                    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";  
                    $headers .= 'From: '.$fromName.'<'.$from.'>' . "\r\n"; 
                    $headers .= 'Cc: swiglasmassrare@gmail.com' . "\r\n"; 
                    $headers .= 'Bcc: aboubakremassrare@gmail.com' . "\r\n"; 
                    // Send email 
                    mail($to, $subject, $htmlContent, $headers);
                }   
        }

}