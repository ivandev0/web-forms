function getTemplateRootNode(scriptId) {
    var div = document.createElement('div');
    var scriptTag = document.getElementById(scriptId);
    div.innerHTML = scriptTag.innerHTML;
    var result = div.children[0];
    div.removeChild(result);
    return result;
}

export default function templateEngine(data) {
    var root = getTemplateRootNode('template');

    var date = root.querySelector('.date');
    var expenses = root.querySelector('.expenses');
    var comment = root.querySelector('.comment');
    var deleteBut = root.querySelector('.delete');

    date.value = data.date;
    expenses.value = data.expenses;
    comment.value = data.comment;

    return {
        root: root,
        date: date,
        expenses: expenses,
        comment: comment,
        deleteBut: deleteBut,
    };
}