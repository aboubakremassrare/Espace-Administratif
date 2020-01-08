<?php defined('BASEPATH') OR exit('No direct script access allowed');

class User_Model extends CI_Model
{
    protected $user_table = 'users';

    /**
     * Use Registration
     * @param: {array} User Data
     */
    public function insert_user(array $data) {
        $this->db->insert($this->user_table, $data);
        return $this->db->insert_id();
    }

    /**
     * User Login
     * ----------------------------------
     * @param: username or email address
     * @param: password
     */
    public function user_login($username, $password)
    {
       
        $this->db->where('username', $username);
        $login= $this->db->get($this->user_table);

        if($login->num_rows() ) 
        {
            $user_pass = $login->row('password');
            if(md5($password) === $user_pass) {
                return $login->row();
            }
            return FALSE;
        }else{
            return FALSE;
        }
    }

    
    /**
     * User Login
     * ----------------------------------
   
     * @param: user_id
     */
    public function user_data($user_id)
    {

        $this->db->where('user_id', $user_id);
        $user= $this->db->get($this->user_table);
        return $user->row();
      
    }

    /**
     * User check toker
     * 
     * @param: token
     */

    public function checkToken($token)
	{
		$this->db->where('Token', $token);
		$query = $this->db->get($this->user_table);
		if($query->num_rows() ==1){
			return true;
		}
		return false;
    }
    
}
