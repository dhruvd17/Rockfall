  const userName = "Neer Malik";
    const userRole = "Admin";
    const systemOnline = true;

    let droneImagery = true;
    let showSensors = true;
    let liveUpdates = true;

    const sectors = [
      { id: 'A', name: 'Sector A', stability: 75, lastUpdate: '3 min ago', activeSensors: 2, totalSensors: 3, size: {width: 120, height: 65}, position: {top: 40, left: 28} },
      { id: 'B', name: 'Sector B', stability: 65, lastUpdate: '1 min ago', activeSensors: 3, totalSensors: 3, size: {width: 110, height: 60}, position: {top: 10, left: 133} },
      { id: 'C', name: 'Sector C', stability: 45, lastUpdate: 'Just now', activeSensors: 2, totalSensors: 4, size: {width: 95, height: 55}, position: {top: 75, left: 235} },
      { id: 'D', name: 'Sector D', stability: 80, lastUpdate: '5 min ago', activeSensors: 3, totalSensors: 3, size: {width: 105, height: 58}, position: {top: 140, left: 71} },
      { id: 'E', name: 'Sector E', stability: 55, lastUpdate: '2 min ago', activeSensors: 3, totalSensors: 4, size: {width: 115, height: 62}, position: {top: 160, left: 200} }
    ];

    function getRiskLevel(stability) {
      if (stability < 50) return 'high';
      if (stability <= 70) return 'medium';
      return 'low';
    }

    const userNameEl = document.getElementById('userName');
    const userRoleEl = document.getElementById('userRole');
    const userNameHeader = document.getElementById('userNameHeader');
    const userRoleHeader = document.getElementById('userRoleHeader');
    const systemStatusText = document.getElementById('systemStatusText');

    const droneToggle = document.getElementById('drone');
    const sensorsToggle = document.getElementById('sensors');
    const liveToggle = document.getElementById('live');
    const mapContainer = document.getElementById('mapContainer');
    const liveBadge = document.getElementById('liveBadge');
    const zoneDetails = document.getElementById('zoneDetails');
    const defaultZoneContent = document.getElementById('defaultZoneContent');
    const sectorInfo = document.getElementById('sectorInfo');
    const sectorName = document.getElementById('sectorName');
    const riskBadge = document.getElementById('riskBadge');
    const stabilityValue = document.getElementById('stabilityValue');
    const lastUpdateValue = document.getElementById('lastUpdateValue');
    const sensorsValue = document.getElementById('sensorsValue');

    const highRiskCountEl = document.getElementById('highRiskCount');
    const medRiskCountEl = document.getElementById('medRiskCount');
    const safeCountEl = document.getElementById('safeCount');
    const sensorsOnlineCountEl = document.getElementById('sensorsOnlineCount');
    const coveragePercentEl = document.getElementById('coveragePercent');
    const lastUpdatedText = document.getElementById('lastUpdatedText');

    function renderUserAndStatus() {
      userNameEl.textContent = userName;
      userRoleEl.textContent = userRole;
      userNameHeader.textContent = userName;
      userRoleHeader.textContent = userRole;
      systemStatusText.textContent = systemOnline ? 'System Online' : 'System Offline';
      if (!systemOnline) {
        document.getElementById('systemStatusBtn').classList.add('offline');
      }
    }

    function renderZones() {
      mapContainer.innerHTML = '';
      sectors.forEach(sector => {
        const riskLevel = getRiskLevel(sector.stability);
        const riskClass = riskLevel === 'high' ? 'zone-high' : (riskLevel === 'medium' ? 'zone-med' : 'zone-low');

        const el = document.createElement('div');
        el.className = `zone-circle ${riskClass}`;
        el.dataset.sector = sector.id;
        el.dataset.name = sector.name;
        el.dataset.stability = sector.stability;
        el.dataset.risk = riskLevel;
        el.dataset.lastUpdate = sector.lastUpdate;
        el.dataset.activeSensors = sector.activeSensors;
        el.dataset.totalSensors = sector.totalSensors;
        el.style.width = (sector.size.width) + 'px';
        el.style.height = (sector.size.height) + 'px';
        el.style.top = (sector.position.top) + 'px';
        el.style.left = (sector.position.left) + 'px';
        el.textContent = sector.name;

        const dot = document.createElement('div');
        dot.className = 'sensor-dot';
        el.appendChild(dot);

        el.addEventListener('click', (ev) => {
          ev.stopPropagation();
          document.querySelectorAll('.zone-circle').forEach(z => z.classList.remove('selected'));
          el.classList.add('selected');
          showSectorDetails(el.dataset.sector);
        });

        mapContainer.appendChild(el);
      });
    }

    function computeSummary() {
      const highRiskZones = sectors.filter(s => getRiskLevel(s.stability) === 'high').length;
      const medRiskZones = sectors.filter(s => getRiskLevel(s.stability) === 'medium').length;
      const safeZones = sectors.filter(s => getRiskLevel(s.stability) === 'low').length;
      const sensorsOnline = sectors.reduce((sum, s) => sum + s.activeSensors, 0);
      const sensorsTotal = sectors.reduce((sum, s) => sum + s.totalSensors, 0);
      const coveragePercent = sensorsTotal === 0 ? 0 : Math.round((sensorsOnline / sensorsTotal) * 100);

      highRiskCountEl.textContent = highRiskZones;
      medRiskCountEl.textContent = medRiskZones;
      safeCountEl.textContent = safeZones;
      sensorsOnlineCountEl.textContent = `${sensorsOnline} / ${sensorsTotal}`;
      coveragePercentEl.textContent = `${coveragePercent}%`;

      lastUpdatedText.textContent = new Date().toLocaleString();
    }

    function updateDroneImagery() {
      if (droneImagery) {
        mapContainer.classList.remove('map-bg-plain');
        mapContainer.classList.add('map-bg-textured');
      } else {
        mapContainer.classList.add('map-bg-plain');
        mapContainer.classList.remove('map-bg-textured');
      }
    }

    function updateSensorsVisibility() {
      document.querySelectorAll('.sensor-dot').forEach(dot => {
        dot.style.visibility = showSensors ? 'visible' : 'hidden';
      });
    }

    function updateLiveBadge() {
      liveBadge.style.display = liveUpdates ? 'inline-flex' : 'none';
    }

    function showSectorDetails(sectorId) {
      const el = Array.from(document.querySelectorAll('.zone-circle')).find(z => z.dataset.sector === sectorId);
      if (!el) return;
      const name = el.dataset.name;
      const stability = el.dataset.stability;
      const risk = el.dataset.risk;
      const lastUpdate = el.dataset.lastUpdate;
      const activeSensors = el.dataset.activeSensors;
      defaultZoneContent.style.display = 'none';
      sectorInfo.style.display = 'block';
      sectorName.textContent = name;
      stabilityValue.textContent = stability + '%';
      lastUpdateValue.textContent = lastUpdate;
      sensorsValue.textContent = activeSensors + ' Active';
      riskBadge.textContent = risk.toUpperCase() + ' RISK';
      riskBadge.className = 'badge mb-3 ';
      if (risk === 'high') {
        riskBadge.classList.add('bg-danger');
      } else if (risk === 'medium') {
        riskBadge.classList.add('bg-warning', 'text-dark');
      } else {
        riskBadge.classList.add('bg-success');
      }
    }

    function hideSectorDetails() {
      defaultZoneContent.style.display = 'block';
      sectorInfo.style.display = 'none';
    }

    document.addEventListener('DOMContentLoaded', () => {
      renderUserAndStatus();

      droneToggle.checked = droneImagery;
      sensorsToggle.checked = showSensors;
      liveToggle.checked = liveUpdates;

      renderZones();
      computeSummary();
      updateDroneImagery();
      updateSensorsVisibility();
      updateLiveBadge();

      droneToggle.addEventListener('change', (e) => { droneImagery = e.target.checked; updateDroneImagery(); });
      sensorsToggle.addEventListener('change', (e) => { showSensors = e.target.checked; updateSensorsVisibility(); });
      liveToggle.addEventListener('change', (e) => { liveUpdates = e.target.checked; updateLiveBadge(); });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('.zone-circle') && !e.target.closest('.details')) {
          document.querySelectorAll('.zone-circle').forEach(z => z.classList.remove('selected'));
          hideSectorDetails();
        }
      });

      const zoomInBtn = document.getElementById('zoomInBtn');
      const zoomOutBtn = document.getElementById('zoomOutBtn');
      let mapScale = 1;
      zoomInBtn.addEventListener('click', () => {
        mapScale = Math.min(2, mapScale + 0.1);
        mapContainer.style.transform = `scale(${mapScale})`;
        mapContainer.style.transformOrigin = 'left top';
      });
      zoomOutBtn.addEventListener('click', () => {
        mapScale = Math.max(0.6, mapScale - 0.1);
        mapContainer.style.transform = `scale(${mapScale})`;
        mapContainer.style.transformOrigin = 'left top';
      });

      const toggleBtn = document.getElementById('toggleBtn');
      const appGrid = document.getElementById('appGrid');
      toggleBtn.addEventListener('click', () => {
        appGrid.classList.toggle('sidebar-collapsed');
      });

     
      document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
          document.querySelectorAll('.sidebar-menu a').forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          const contentFrame = document.querySelector('.content-frame');
          const href = link.getAttribute('href');
          if (contentFrame && href) {
            e.preventDefault();
            contentFrame.src = href;
          }
        });
      });

    });