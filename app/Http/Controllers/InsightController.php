<?php

namespace App\Http\Controllers;

use App\Models\Insight;
use Illuminate\Http\Request;

class InsightController extends Controller
{
        public function insert(Request $request){
            foreach ($request->all() as $item) { 
            $data = new Insight();
            $data->title = $item['title']??"";
            $data->start_year = $item['start_year']??"";
            $data->end_year = $item['end_year']?? "";
            $data->city = $item['city']??"";
            $data->country = $item['country']??"";
            $data->intensity = $item['intensity']??"";
            $data->likelihood = $item['likelihood']??"";
            $data->relevance = $item['relevance']??"";
            $data->topic = $item['topic']??"";
            $data->region = $item['region']??"";
            $data->sector = $item['sector']??"";
            $data->source = $item['source']??"";
            $data->url = $item['url']??"";
            $data->pest = $item['pest']??"";
            $data->swot = $item['swot']??"";
            $data->save();
        }
            return response([
                'data' => $request->all(),
                'status' => 'success',
            ]);
        }

    public function filter(Request $request){
        if(!$request->pests){
            $data = Insight::all();
            return response([
                'data' => $data,
                'status' => 'success',
            ]);
        }
        $data = Insight::where('pest', $request->pests)->get();
        
        return response([
            'data' => $data,
            'status' => 'success',
        ]);
    }
}
