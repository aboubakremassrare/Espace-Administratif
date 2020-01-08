<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Attestation_Model extends CI_Model
{
    protected $attestation_table = 'attestations';

    /**
     * 
     * ----------------------------------
     */
    public function ajouter_attestation($data)
    {

        $this->db->insert('attestations',$data);
        return $this->db->insert_id();
      
    }

    /*recuperer l'attestation d 'apres id */

    public function getAttestationNom($id_attestation){
        $this->db->where("id",$id_attestation);
        $this->db->where("actif",1);
        $attestations=$this->db->get("attestation_type");
        return($attestations->row());
    }


    
}
