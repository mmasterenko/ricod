function switch_obj(div_id)
{
	if (document.getElementById(div_id).style.display=='none')
	{
		document.getElementById(div_id).style.display='';
	}
	else
	{
		document.getElementById(div_id).style.display='none';
	}
}

function close_all(id){
		$("div[id^='add_comment']").hide();
		$("#add_comment_"+id).show();
}


function ModerPost(id){
	$.get("/shops_admin/ajax_comment_moder/", {postid: id },
	function(data){
		$("#moder_"+ id).html('');
	});
}

function DelPost(id){
	$.get("/shops_admin/ajax_comment_del/", {postid: id },
	function(data){
		$("#comment_div_"+ id).html('');
	});
}

function injectPayRow(id, m_id){
    $('.specrow').remove();
    $('#pay_row_'+id).after('<tr class="specrow"><td colspan="7" id="paydata"></td></tr>');
    $.get("/ajax_payment_data/", {go_id: id, m_id: m_id },
	function(data){
		$('#paydata').html(data);
	});
}