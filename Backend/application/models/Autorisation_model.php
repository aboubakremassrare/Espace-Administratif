<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Autorisation_Model extends CI_Model
{
    protected $autorisation_table = 'autorisations';

    /**
     * 
     * ajouter un avance
     */
    public function ajouter_autorisation($data)
    {
        $this->db->insert('autorisations',$data);
        return $this->db->insert_id();
    }




    
}
