 const perms = [
    { name: 'View Dashboard', admin: false, planner: true, tech: true },
    { name: 'Upload Data', admin: false, planner: false, tech: false },
    { name: 'Configure Settings', admin: false, planner: false, tech: true },
    { name: 'Manage Users', admin: false, planner: null, tech: null },
    { name: 'Download Reports', admin: false, planner: null, tech: null }
  ];

  function makeToggle(id, checked){
    const wrapper = document.createElement('label');
    wrapper.className = 'toggle' + (checked ? ' on' : '');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = !!checked;
    if (checked === null) { input.disabled = true; wrapper.style.opacity = 0.45; wrapper.style.cursor='not-allowed'; }
    input.addEventListener('change', (e)=> wrapper.classList.toggle('on', e.target.checked));
    const knob = document.createElement('span');
    knob.className = 'knob';
    wrapper.appendChild(input);
    wrapper.appendChild(knob);
    return wrapper;
  }

  function buildPermTable(){
    const tbody = document.getElementById('permBody');
    perms.forEach((p, idx)=>{
      const tr = document.createElement('tr');
      const tdName = document.createElement('td');
      tdName.className = 'perm-left';
      tdName.innerHTML = '<div class=\"perm-row\"><div class=\"perm-name\">'+p.name+'</div></div>';
      const tdAdmin = document.createElement('td'); tdAdmin.className = 'role-col'; tdAdmin.appendChild(makeToggle('t-admin-'+idx, p.admin));
      const tdPlanner = document.createElement('td'); tdPlanner.className = 'role-col'; tdPlanner.appendChild(makeToggle('t-planner-'+idx, p.planner));
      const tdTech = document.createElement('td'); tdTech.className = 'role-col'; tdTech.appendChild(makeToggle('t-tech-'+idx, p.tech));
      tr.appendChild(tdName); tr.appendChild(tdAdmin); tr.appendChild(tdPlanner); tr.appendChild(tdTech);
      tbody.appendChild(tr);
    });
  }

  buildPermTable();