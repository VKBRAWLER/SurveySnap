const reward_box = document.getElementsByClassName('m-card-group')[0];
// if (reward_box.children[0].getElementsByClassName('mee-icon-AddMedium')[0]) reward_box.children[0].getElementsByClassName('mee-icon-AddMedium')[0].click();
for (let i = 0; reward_box.children.length > i; i++) {
  let child = reward_box.children[0];
  if (child.getElementsByClassName('mee-icon-AddMedium').length > 0) {
    child.getElementsByClassName('mee-icon-AddMedium')[0].click();
  }
}