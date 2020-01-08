<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Departement_Model extends CI_Model
{
    protected $dept_table = 'departements';

    /**
     * Departement liste
     * ----------------------------------
     */
    public function departement_data()
    {
        $this->db->where('actif',1);
        $departement= $this->db->get($this->dept_table);
        return $departement->result();
      
    }


    
}
