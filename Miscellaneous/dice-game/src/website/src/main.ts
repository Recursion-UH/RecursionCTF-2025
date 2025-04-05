import './style.css';

function setErrorAlert(message: string) {
  const alert = document.querySelector<HTMLDivElement>('#alert')!
  alert.classList.remove('hidden');
  alert.classList.remove('bg-green-800/50', 'border-green-900', 'text-green-50');
  alert.classList.add('bg-red-800/50', 'border-red-900', 'text-red-50');
  alert.textContent = message;
}

function setSuccessAlert(message: string) {
  const alert = document.querySelector<HTMLDivElement>('#alert')!
  alert.classList.remove('hidden');
  alert.classList.remove('bg-red-800/50', 'border-red-900', 'text-red-50');
  alert.classList.add('bg-green-800/50', 'border-green-900', 'text-green-50');
  alert.textContent = message;
}

function launchInstance(element: HTMLButtonElement) {
  element.addEventListener('click', async () => {
    const uid = sessionStorage.getItem('uid');

    const challenge = document.querySelector<HTMLInputElement>('#challenge')!.value;
    if (challenge === null) {
      setErrorAlert('Reload the page to generate a new challenge number.');
      return;
    }

    const nonce = document.querySelector<HTMLInputElement>('#pow')!.value;
    if (nonce.trim() === '') {
      setErrorAlert('The proof of work is required.');
      return;
    }

    setSuccessAlert('The instance is being launched. Please wait...');

    const res = await fetch(`/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uid, challenge, nonce })
    });

    const data = await res.json();
    if (!res.ok) {
      setErrorAlert(data.message);
      return;
    }

    sessionStorage.setItem('uid', data.uid);
    sessionStorage.setItem('rpc-url', data.rpcUrl);
    sessionStorage.setItem('private-key', data.privateKey);
    sessionStorage.setItem('wallet-address', data.playerAddress);
    sessionStorage.setItem('setup-address', data.setupAddress);
    sessionStorage.setItem('challenge-address', data.challengeAddress);

    document.querySelector<HTMLSpanElement>('#solve-pow')!.classList.add('hidden');
    document.querySelector<HTMLSpanElement>('#rpc-url')!.textContent = data.rpcUrl;
    document.querySelector<HTMLSpanElement>('#private-key')!.textContent = data.privateKey;
    document.querySelector<HTMLSpanElement>('#wallet-address')!.textContent = data.playerAddress;
    document.querySelector<HTMLSpanElement>('#setup-address')!.textContent = data.setupAddress;
    document.querySelector<HTMLSpanElement>('#challenge-address')!.textContent = data.challengeAddress;

    setSuccessAlert('The instance has been launched.');
  });
}

function killInstance(element: HTMLButtonElement) {
  element.addEventListener('click', async () => {
    const uid = sessionStorage.getItem('uid');
    if (uid === null) {
      setErrorAlert('The instance is not running.');
      return;
    }

    const res = await fetch(`/${uid}/kill`);

    if (res.status !== 429) {
      sessionStorage.removeItem('uid');
      sessionStorage.removeItem('rpc-url');
      sessionStorage.removeItem('private-key');
      sessionStorage.removeItem('wallet-address');
      sessionStorage.removeItem('setup-address');
      sessionStorage.removeItem('challenge-address');

      document.querySelector<HTMLSpanElement>('#solve-pow')!.classList.remove('hidden');
      document.querySelector<HTMLSpanElement>('#solve-pow')!.textContent = 'Refresh the page to generate a new challenge number.';
      document.querySelector<HTMLSpanElement>('#rpc-url')!.textContent = '';
      document.querySelector<HTMLSpanElement>('#private-key')!.textContent = '';
      document.querySelector<HTMLSpanElement>('#wallet-address')!.textContent = '';
      document.querySelector<HTMLSpanElement>('#setup-address')!.textContent = '';
      document.querySelector<HTMLSpanElement>('#challenge-address')!.textContent = '';
    }

    const data = await res.json();
    if (!res.ok) {
      setErrorAlert(data.message);
      return;
    }

    setSuccessAlert(data.message);
  });
}

function getFlag(element: HTMLButtonElement) {
  element.addEventListener('click', async () => {
    const uid = sessionStorage.getItem('uid');
    if (uid === null) {
      setErrorAlert('The instance is not running.');
      return;
    }

    const res = await fetch(`/${uid}/flag`);
    const data = await res.json();

    if (!res.ok) {
      setErrorAlert(data.message);
      return;
    }

    setSuccessAlert(data.message);
  });
}

launchInstance(document.querySelector<HTMLButtonElement>('#launch')!);
killInstance(document.querySelector<HTMLButtonElement>('#stop')!);
getFlag(document.querySelector<HTMLButtonElement>('#flag')!);

if (sessionStorage.getItem('uid') !== null) {
  document.querySelector<HTMLSpanElement>('#solve-pow')!.classList.add('hidden');
}

document.querySelector<HTMLSpanElement>('#rpc-url')!.textContent = sessionStorage.getItem('rpc-url')!;
document.querySelector<HTMLSpanElement>('#private-key')!.textContent = sessionStorage.getItem('private-key')!;
document.querySelector<HTMLSpanElement>('#wallet-address')!.textContent = sessionStorage.getItem('wallet-address')!;
document.querySelector<HTMLSpanElement>('#setup-address')!.textContent = sessionStorage.getItem('setup-address')!;
document.querySelector<HTMLSpanElement>('#challenge-address')!.textContent = sessionStorage.getItem('challenge-address')!;
