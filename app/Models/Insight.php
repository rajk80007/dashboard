<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Insight extends Model
{
    protected $fillable = [
        'title',
        'start_year',
        'end_year',
        'city',
        'region',
        'country',
        'intensity',
        'likelihood',
        'relevance',
        'topic',
        'sector',
        'source',
        'url',
        'pest',
        'swot',
    ];
}
