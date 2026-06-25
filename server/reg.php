<?php
    error_reporting(0);

    try
       {
        $user = $_POST["user"];
        $email = $_POST["email"];
        $pass = $_POST["pass"];
        $passed = $_POST["passed"];
        
        
        if($pass!=$passed)    
        {
            showMsg("Register failed","The passwords are different you have inputted.");
            return;
        }
        
        $path = "../data/users.json";
        
        if(!file_exists($path) or filesize($path)==false)
        {
            $mfile = fopen($path, "w");
            fwrite($mfile,"{}");
            $content = "{}";
            fclose($mfile);
        }
        $file = fopen($path, "r+");
        $content = fread($file,filesize($path));
        
        $data = json_decode($content,true);
        if(array_key_exists($user,$data))
        {
            showMsg("Cannot register","This account existes in server, you could <a href='../index.html'>Log in</a> now.");
        }
        else
        {
            $mfile = fopen($path, "w");
            $data[$user] = $pass;
              fwrite($mfile,json_encode($data));
            fclose($mfile);
            showMsg("Register successfully","You can <a href='../index.html'>Log in</a> now.");
        }
        fclose($file);
    }
    catch(Exception $e)
    {
        showMsg("Error","Error message:".$e->getMessage().".");
    }
    
    function showMsg($title,$msg)
    {
        $file = fopen("../alert.html","r");
        echo (str_replace("MSG",$msg,str_replace("TITLE",$title,fread($file,filesize("../alert.html")))));
        fclose($file);
    }
?>