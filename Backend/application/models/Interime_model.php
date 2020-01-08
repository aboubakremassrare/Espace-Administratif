<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Interime_Model extends CI_Model
{
    protected $dept_table = 'interimes';

    /**
     * Departement liste
     * ----------------------------------
     */
    public function interime_data()
    {
        $this->db->where('actif',1);
        $departement= $this->db->get($this->dept_table);
        return $departement->result();
      
    }


    
}
