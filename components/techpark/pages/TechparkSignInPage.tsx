import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { TechHeroBackdrop } from '../../TechHeroBackdrop';
import { FormStatusMessage } from '../shared/FormStatusMessage';
import { TechparkPageShell } from '../shared/TechparkPageShell';
import type { FormStatus, TechparkPageProps } from '../types';

type SignInStep = 'member' | 'pin';

const PIN_LENGTH = 4;

export const TechparkSignInPage: React.FC<TechparkPageProps> = ({ lang }) => {
  const isBs = lang === 'bs';
  const [step, setStep] = useState<SignInStep>('member');
  const [memberId, setMemberId] = useState('');
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState<FormStatus | null>(null);

  const copy = {
    badge: isBs ? 'techpark prijava' : 'techpark sign in',
    title: isBs ? 'PRIJAVA CLANA' : 'MEMBER SIGN IN',
    subtitle: isBs ? 'Prvo korisnicko ime, zatim PIN preko ekrana.' : 'First the username, then the PIN on screen.',
    memberStep: isBs ? 'KORAK 1' : 'STEP 1',
    pinStep: isBs ? 'KORAK 2' : 'STEP 2',
    memberTitle: isBs ? 'Ko se prijavljuje?' : 'Who is signing in?',
    memberSubtitle: isBs ? 'Unesi Member ID ili email za nastavak.' : 'Enter the Member ID or email to continue.',
    memberPlaceholder: isBs ? 'Member ID ili email' : 'Member ID or email',
    continue: isBs ? 'NASTAVI' : 'CONTINUE',
    memberError: isBs ? 'Unesi korisnicko ime prije nastavka.' : 'Enter the username before continuing.',
    pinTitle: isBs ? 'Unesi PIN kod' : 'Enter the PIN code',
    pinSubtitle: isBs ? 'PIN se unosi direktno preko ekrana.' : 'The PIN is entered directly on screen.',
    activeMember: isBs ? 'AKTIVNI CLAN' : 'ACTIVE MEMBER',
    change: isBs ? 'PROMIJENI' : 'CHANGE',
    delete: isBs ? 'OBRISI' : 'DELETE',
    clear: isBs ? 'CLEAR' : 'CLEAR',
    signIn: isBs ? 'PRIJAVA' : 'SIGN IN',
    back: isBs ? 'NAZAD' : 'BACK',
    pinError: isBs ? 'Unesi PIN od 4 cifre za prijavu.' : 'Enter a 4-digit PIN to sign in.',
    success: isBs
      ? 'Prijava je uspjesno otvorena. Sljedeci korak moze biti attendance check-in.'
      : 'Sign-in is active. The next step can be attendance check-in.',
  };

  const keypad = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    'clear', '0', 'delete',
  ] as const;

  const handleContinue = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!memberId.trim()) {
      setStatus({ type: 'error', message: copy.memberError });
      return;
    }

    setStatus(null);
    setPin('');
    setStep('pin');
  };

  const handleKeypadPress = (value: (typeof keypad)[number]) => {
    setStatus(null);

    if (value === 'clear') {
      setPin('');
      return;
    }

    if (value === 'delete') {
      setPin((current) => current.slice(0, -1));
      return;
    }

    setPin((current) => (current.length < PIN_LENGTH ? `${current}${value}` : current));
  };

  const handleSubmit = () => {
    if (pin.length !== PIN_LENGTH) {
      setStatus({ type: 'error', message: copy.pinError });
      return;
    }

    setStatus({ type: 'success', message: copy.success });
  };

  return (
    <TechparkPageShell>
      <section className="relative min-h-screen overflow-hidden border-b border-white/5 bg-qla-dark">
        <TechHeroBackdrop />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-28 lg:pb-20">
          <div className="mx-auto max-w-xl">
            <div className="rounded-[2rem] border border-white/10 bg-[#070b12]/90 p-2 shadow-[0_0_50px_rgba(0,123,255,0.18)]">
              <div className="rounded-[calc(2rem-2px)] border border-white/5 bg-gradient-to-br from-blue-950/25 via-[#06080d] to-black p-5 sm:p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-[11px] font-mono tracking-[0.18em] text-blue-300 uppercase">
                      <ShieldCheck className="h-4 w-4" />
                      {copy.badge}
                    </div>
                    <h1 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight">{copy.title}</h1>
                    <p className="mt-2 text-sm sm:text-base text-gray-400 font-mono leading-relaxed">{copy.subtitle}</p>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-[0_0_24px_rgba(37,99,235,0.4)]">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className={`rounded-2xl border px-4 py-3 ${step === 'member' ? 'border-blue-500/40 bg-blue-500/10 text-white' : 'border-white/10 bg-white/5 text-gray-400'}`}>
                    <div className="text-[11px] font-mono tracking-[0.16em] uppercase">{copy.memberStep}</div>
                    <div className="mt-2 text-sm font-bold">{copy.memberTitle}</div>
                  </div>
                  <div className={`rounded-2xl border px-4 py-3 ${step === 'pin' ? 'border-blue-500/40 bg-blue-500/10 text-white' : 'border-white/10 bg-white/5 text-gray-400'}`}>
                    <div className="text-[11px] font-mono tracking-[0.16em] uppercase">{copy.pinStep}</div>
                    <div className="mt-2 text-sm font-bold">{copy.pinTitle}</div>
                  </div>
                </div>

                {step === 'member' ? (
                  <form onSubmit={handleContinue} className="mt-6 space-y-4">
                    <div>
                      <div className="text-xs font-mono tracking-[0.16em] text-blue-300 uppercase">{copy.memberStep}</div>
                      <div className="mt-2 text-xl font-bold">{copy.memberTitle}</div>
                      <p className="mt-2 text-sm text-gray-400 font-mono leading-relaxed">{copy.memberSubtitle}</p>
                    </div>

                    <input
                      value={memberId}
                      onChange={(event) => {
                        setMemberId(event.target.value);
                        setStatus(null);
                      }}
                      placeholder={copy.memberPlaceholder}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                    />

                    <FormStatusMessage status={status} />

                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-blue-600 px-6 py-4 font-mono text-sm font-bold tracking-[0.18em] uppercase transition-all hover:bg-blue-700 hover:shadow-[0_0_18px_rgba(37,99,235,0.55)]"
                    >
                      {copy.continue}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                ) : (
                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-[11px] font-mono tracking-[0.16em] text-blue-300 uppercase">{copy.activeMember}</div>
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <div className="min-w-0 truncate text-lg font-bold">{memberId}</div>
                        <button
                          type="button"
                          onClick={() => {
                            setStep('member');
                            setPin('');
                            setStatus(null);
                          }}
                          className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[11px] font-mono tracking-[0.14em] text-gray-300 uppercase transition-colors hover:border-blue-500 hover:text-white"
                        >
                          <ArrowLeft className="h-3.5 w-3.5" />
                          {copy.change}
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-mono tracking-[0.16em] text-blue-300 uppercase">{copy.pinStep}</div>
                      <div className="mt-2 text-xl font-bold">{copy.pinTitle}</div>
                      <p className="mt-2 text-sm text-gray-400 font-mono leading-relaxed">{copy.pinSubtitle}</p>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                      {Array.from({ length: PIN_LENGTH }).map((_, index) => {
                        const hasValue = Boolean(pin[index]);

                        return (
                          <div
                            key={index}
                            className={`flex h-16 items-center justify-center rounded-2xl border text-2xl font-black transition-colors ${
                              hasValue
                                ? 'border-blue-500/40 bg-blue-500/10 text-white'
                                : 'border-white/10 bg-black/30 text-gray-600'
                            }`}
                          >
                            {hasValue ? '•' : ''}
                          </div>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {keypad.map((key) => {
                        const isAction = key === 'clear' || key === 'delete';
                        const label = key === 'clear' ? copy.clear : key === 'delete' ? copy.delete : key;

                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => handleKeypadPress(key)}
                            className={`flex h-16 items-center justify-center rounded-2xl border font-mono text-sm font-bold tracking-[0.16em] uppercase transition-all ${
                              isAction
                                ? 'border-white/10 bg-white/5 text-gray-300 hover:border-blue-500 hover:text-white'
                                : 'border-blue-500/20 bg-blue-500/10 text-white hover:border-blue-500 hover:bg-blue-500/20'
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>

                    <FormStatusMessage status={status} />

                    <div className="grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => {
                          setStep('member');
                          setPin('');
                          setStatus(null);
                        }}
                        className="rounded-sm border border-white/15 px-6 py-4 font-mono text-sm font-bold tracking-[0.16em] uppercase text-gray-300 transition-colors hover:border-blue-500 hover:text-white"
                      >
                        {copy.back}
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="inline-flex items-center justify-center gap-2 rounded-sm bg-blue-600 px-6 py-4 font-mono text-sm font-bold tracking-[0.18em] uppercase transition-all hover:bg-blue-700 hover:shadow-[0_0_18px_rgba(37,99,235,0.55)]"
                      >
                        {copy.signIn}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </TechparkPageShell>
  );
};
