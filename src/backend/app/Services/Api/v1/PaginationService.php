<?php

namespace App\Services\Api\v1;

use Illuminate\Http\Request;

class PaginationService
{
    /**
     * Get collection with pagination values
     * @param Request $request
     * @return array
     */
    public function getPagination(Request $request): array {
        $orderDirection = 'asc';
        $perPage = 10;
        $page = 1;
        $orderBy = 'id';

        if($request->has('orderDirection')){
            $orderDirection = $request->orderDirection;
        }

        if($request->has('perPage')) {
            $perPage = $request->perPage;
        }

        if($request->has('page')){
            $page = $request->page;
        }

        if($request->has('orderBy')){
            $orderBy = $request->orderBy;
        }

        $pagination = [
            'orderDirection' => $orderDirection,
            'perPage' => $perPage,
            'page' => $page,
            'orderBy' => $orderBy,
            'offset' => ($perPage * $page) - $perPage,
        ];

        return $pagination;
    }
}