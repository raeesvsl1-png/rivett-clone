document.addEventListener('DOMContentLoaded', () => {
  // Trigger page entrance animations
  requestAnimationFrame(() => {
    document.body.classList.add('page-loaded');
  });

  // Mouse ambient glow tracker
  const ambientGlow = document.getElementById('ambientGlow');
  window.addEventListener('mousemove', (e) => {
    if (ambientGlow) {
      ambientGlow.style.left = `${e.clientX}px`;
      ambientGlow.style.top = `${e.clientY}px`;
    }
  });

  // Modals & Drawers
  const appModal = document.getElementById('appModal');
  const deskDrawer = document.getElementById('deskDrawer');
  const getStartedBtnNav = document.getElementById('getStartedBtnNav');
  const getStartedBtnHero = document.getElementById('getStartedBtnHero');
  const calcBtn = document.getElementById('calcBtn');
  const closeModal = document.getElementById('closeModal');
  const closeDrawer = document.getElementById('closeDrawer');
  const deskReportLink = document.getElementById('deskReportLink');
  const docsLink = document.getElementById('docsLink');
  const toast = document.getElementById('toast');

  // Calculator inputs
  const assetSelect = document.getElementById('assetSelect');
  const depositAmount = document.getElementById('depositAmount');
  const resApy = document.getElementById('resApy');
  const resMonthly = document.getElementById('resMonthly');
  const resAnnual = document.getElementById('resAnnual');
  const confirmDepositBtn = document.getElementById('confirmDepositBtn');

  function updateYieldCalculator() {
    if (!assetSelect || !depositAmount) return;
    
    const selectedOption = assetSelect.options[assetSelect.selectedIndex];
    const yieldRate = parseFloat(selectedOption.getAttribute('data-yield') || 14.2);
    const amount = Math.max(0, parseFloat(depositAmount.value) || 0);

    const annualIncome = (amount * yieldRate) / 100;
    const monthlyIncome = annualIncome / 12;

    resApy.textContent = `${yieldRate.toFixed(1)}%`;
    resMonthly.textContent = `$${monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    resAnnual.textContent = `$${annualIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  if (assetSelect && depositAmount) {
    assetSelect.addEventListener('change', updateYieldCalculator);
    depositAmount.addEventListener('input', updateYieldCalculator);
    updateYieldCalculator();
  }

  // Open Modal
  function openAppModal() {
    if (appModal) appModal.classList.remove('hidden');
  }

  function closeAppModal() {
    if (appModal) appModal.classList.add('hidden');
  }

  if (getStartedBtnNav) getStartedBtnNav.addEventListener('click', openAppModal);
  if (getStartedBtnHero) getStartedBtnHero.addEventListener('click', openAppModal);
  if (calcBtn) calcBtn.addEventListener('click', openAppModal);
  if (closeModal) closeModal.addEventListener('click', closeAppModal);

  // Close modal when clicking outside
  if (appModal) {
    appModal.addEventListener('click', (e) => {
      if (e.target === appModal) closeAppModal();
    });
  }

  // Drawer events
  if (deskReportLink) {
    deskReportLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (deskDrawer) deskDrawer.classList.remove('hidden');
    });
  }

  if (closeDrawer) {
    closeDrawer.addEventListener('click', () => {
      if (deskDrawer) deskDrawer.classList.add('hidden');
    });
  }

  if (deskDrawer) {
    deskDrawer.addEventListener('click', (e) => {
      if (e.target === deskDrawer) deskDrawer.classList.add('hidden');
    });
  }

  if (docsLink) {
    docsLink.addEventListener('click', (e) => {
      e.preventDefault();
      showToast("Opening Rivett Documentation...");
    });
  }

  // Confirm Deposit
  if (confirmDepositBtn) {
    confirmDepositBtn.addEventListener('click', () => {
      confirmDepositBtn.textContent = "Connecting Web3 Wallet...";
      setTimeout(() => {
        confirmDepositBtn.textContent = "Connect Wallet & Deposit";
        closeAppModal();
        showToast("Connected to Web3 provider. Position registered!");
      }, 1200);
    });
  }

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove('hidden');
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 300);
    }, 2800);
  }
});
