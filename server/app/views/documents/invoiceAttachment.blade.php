<style>
	
	th {
		font-size: 6pt;
		line-height: 2.2;
		font-family: helvetica;
	}

	td {
		font-size: 10pt;
		height: 6mm;
		line-height: 1.6;
		font-family: helvetica;
	}
	
	.vMargin {
		height: 20mm;
	}
	.margin {
		width: 20mm;
	}

	.leftPadding {
		width: 3mm;
	}
	
	.date {
		width: 17mm;
		text-align: left;
		
	}

	.time {
		width: 18mm;
		text-align: left;
		color: #878787;
	}

	.orderNr {
		width: 23mm;
		text-align: right;
	}

	.separator1 {
		width: 5mm;
	}

	.orderer {
		width: 58mm;
		text-align: left;
	}

	.provision {
		width: 22mm;
		text-align: right;
		color: #878787;
	}

	.value {
		width: 13mm;
		text-align: right;
	}

	.separator2 {
		width: 2mm;
	}

	.paymentMethod {
		width: 5mm;
		font-family: "Hemmet Personal Use Only";
		font-size: 30pt;
		line-height: 0.4;
	}

	.lineSeparator {
		border-top: 1px solid #ccc;
		line-height: 0.1;
		height: 1px;
	}

</style>


<div><table><tbody>
	<tr>
		<td colspan="11" style="height: 31mm"></td>
	</tr>
	<tr>
		<th class="leftPadding"></th>
		<th class="date">DATUM</th>
		<th class="time"></th>
		<th class="orderNr">BEST-NR</th>
		<th class="separator1"></th>
		<th class="orderer">NAME</th>
		<th class="provision">PROV.</th>
		<th class="separator2"></th>
		<th class="value">BETRAG</th>
		<th class="separator2"></th>
		<th class="paymentMethod"></th>
	</tr>	
	@foreach ($orders as $order)
	<tr>
		<td class="lineSeparator" colspan="11"></td>
	</tr>
	<tr>
		<td class="leftPadding"></td>
		<td class="date">{{ $order['date'] }}</td>
		<td class="time">{{ $order['time'] }}</td>
		<td class="orderNr">{{ $order['number'] }}</td>
		<td class="separator1"></td>
		<td class="orderer">{{ $order['name'] }}</td>
		<td class="provision">{{ $order['commissionRate'] }}%</td>
		<td class="separator2"></td>
		<td class="value">{{ $order['total'] }}€</td>
		<td class="separator2"></td>
		<td class="paymentMethod">q</td>
	</tr>
	@endforeach
	
</tbody></table></div>