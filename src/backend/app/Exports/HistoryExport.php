<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;

class HistoryExport implements FromView

{
    use Exportable;

    public function __construct($history)
    {

        $this->history = $history;
    }


    public function view(): View
    {
        return view('export.history')->with([
            'history' => $this->history
        ]);
    }
}