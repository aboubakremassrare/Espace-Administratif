<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Interime_Model extends CI_Model
{
    protected $interime_table = 'interimes';

    /**
     * Interime liste
     * ----------------------------------
     */
    public function interime_data()
    {
        $this->db->where('actif',1);
        $departement= $this->db->get($this->interime_table);
        return $departement->result();
      
    }


    
    /**
     * Interime insert
     * ----------------------------------
     */

    public function interime_insert(array $data) {
        $this->db->insert('interimes', $data);
        return $this->db->insert_id();
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
