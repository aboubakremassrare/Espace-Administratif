<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Conge_Model extends CI_Model
{
    protected $conge_table = 'conges';

    /**
     * 
     * ajouter un conge
     */
    public function ajouter_conge($data)
    {
        $this->db->insert('conges',$data);
        return $this->db->insert_id();
    }




    
}
