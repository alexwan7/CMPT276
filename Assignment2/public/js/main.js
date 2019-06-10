const delete_button = document.getElementById('delete_student');

delete_button.onclick=function(){
    var form = document.createElement('form');
    var input = document.createElement("INPUT");
    input.setAttribute("type", "text");
    input.style.display = 'hidden';
    input.setAttribute("name","student_id")
    input.setAttribute("value",delete_button.value)
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/delete_student_info');
    form.style.display = 'hidden';
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
};
