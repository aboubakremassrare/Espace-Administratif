<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Interime_Model extends CI_Model
{
    protected $interime_table = 'interimes';

    /**
     * Departement liste
     * ----------------------------------
     */
    public function interime_data()
    {
        $this->db->where('actif',1);
        $departement= $this->db->get($this->interime_table);
        return $departement->result();
      
    }


            /**
     * Interime by id
     * ----------------------------------
     */
    public function interimedetailById($idInterime)
    {
        $this->db->where('actif',1);
        $this->db->where('id',$idInterime);
        $interime= $this->db->get($this->interime_table);
        return $interime->row();
      
    }


    
}
