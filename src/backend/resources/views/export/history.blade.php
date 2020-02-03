<table>
    <tr>
        <th align="center"><b>Meno</b></th>
        <th align="center"><b>Priezvisko</b></th>
        <th align="center"><b>Procedúra</b></th>
        <th align="center"><b>Začiatok</b></th>
        <th align="center"><b>Koniec</b></th>
    </tr>

    @foreach ($history as $item)
    <tr>
        <td align="center">{{$item->first_name}}</td>
        <td align="center">{{$item->last_name}}</td>
        <td align="center">{{$item->name}}</td>
        <td align="center">{{$item->start_time}}</td>
        <td align="center">{{$item->end_time}}</td>
    </tr>
    @endforeach
</table>
