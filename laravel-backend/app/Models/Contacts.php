<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contacts extends Model
{
    protected $fillable = ['firstName', 'lastName', 'phone', 'email'];
}
