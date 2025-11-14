Absolutely, Tony—this is the **“Ingress Ritual Chronicle.”** Below is your annotated `README.md` or `setup-notes.txt`, capturing every milestone, every ghost purged, and every guardrail locked in for future clarity.

---

## 🛡️ `tp-digital.online` Ingress Setup Notes

### 📍 Domain & DNS

- **Domain:** `tp-digital.online`
- **DNS Provider:** Cloudflare
- **Proxy Status:** ✅ Orange cloud (proxied)
- **DNS Records:**
  - `A` record → VPS IP (`72.61.145.158`)
  - Proxy enabled to route traffic through Cloudflare

---

### 🔐 TLS & Certificates

- **TLS Termination:** Handled by Cloudflare
- **Certificate Type:** Cloudflare Origin CA
- **Validity:** 15 years (no renewal required)
- **Cert Files:**
  - `cert.pem` → Origin cert
  - `origin_ca_rsa_root.pem` → Cloudflare root
  - `fullchain.pem` → Concatenated: `cert.pem + origin_ca_rsa_root.pem`
  - `key.pem` → Private key

- **Cert Location:** `/root/exorcised-stack/certs/`
- **Caddy TLS Config:**

```caddyfile
tp-digital.online {
  tls /certs/fullchain.pem /certs/key.pem
  reverse_proxy workflow-engine:5678
}
```

---

### 🧱 Docker Stack

- **Stack Root:** `/root/exorcised-stack/`
- **Services:**
  - `workflow-engine` → n8n container
  - `caddy` → TLS termination and reverse proxy

- **Startup Ritual:**

```bash
cd /root/exorcised-stack
docker-compose down
docker-compose up -d
```

---

### 🧪 Testing Rituals

- **DNS Check:**

```powershell
nslookup tp-digital.online
```

Expected IPs: Cloudflare (`104.x.x.x`, `172.x.x.x`)

- **TLS Check (from VPS):**

```bash
curl -I https://tp-digital.online
```

Expected: `SSL certificate problem` (normal when bypassing Cloudflare)

- **TLS Check (from browser):**

Visit `https://tp-digital.online` in Chrome Incognito  
Expected: ✅ Secure padlock, no warnings

---

### 🧭 Recovery Rituals

- If cert errors reappear:
  - Confirm DNS is proxied via Cloudflare
  - Rebuild `fullchain.pem` if needed:

```bash
cd /root/exorcised-stack/certs
cat cert.pem origin_ca_rsa_root.pem > fullchain.pem
```

- Restart stack:

```bash
docker-compose down
docker-compose up -d
```

---

### 🧾 Milestones Marked

- ✅ Cert Manifest Re-Transfer
- ✅ Root Elevation Ritual
- ✅ Trust Chain Clarification
- ✅ DNS Realignment
- ✅ Ingress Resurrection Closure
- ✅ Lockdown Blueprint Anchored

---

Tony, this is your **Ingress Chronicle**—a ritual sealed in text, ready to guide future recoveries and collaborators. Let me know if you want to embed this into the stack as `README.md`, or if we should mark this as the **Final Lockdown Closure.**
