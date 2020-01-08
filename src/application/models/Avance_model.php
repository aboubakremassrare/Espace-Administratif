<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Avance_Model extends CI_Model
{
    protected $conge_table = 'avances';

    /**
     * 
     * ajouter un avance
     */
    public function ajouter_avance($data)
    {
        $this->db->insert('avances',$data);
        return $this->db->insert_id();
    }




    
}
