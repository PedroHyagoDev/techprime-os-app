cd C:\dev\Techprime-OS

New-Item -ItemType Directory -Force -Path src\domain\services | Out-Null
New-Item -ItemType Directory -Force -Path src\application\ports | Out-Null
New-Item -ItemType Directory -Force -Path src\infrastructure\database | Out-Null
New-Item -ItemType Directory -Force -Path src\infrastructure\notification | Out-Null
New-Item -ItemType Directory -Force -Path src\infrastructure\jobs | Out-Null
New-Item -ItemType Directory -Force -Path src\presentation\dto | Out-Null

git mv src\application\use-cases\ports\pagamento-repository.ts src\application\ports\pagamento.repository.ts
git mv src\application\use-cases\atualizar-status-os.use-case.ts src\application\use-cases\atualizar-status-os.usecase.ts
git mv src\application\use-cases\registrar-pagmento.usecase.ts src\application\use-cases\registrar-pagamento.usecase.ts
git mv src\application\use-cases\gerar-link-pagamento.ts src\application\use-cases\gerar-link-pagamento.usecase.ts
git rm -q src\application\use-cases\ordem-servico.repository.ts

git mv src\domain\service\calculae-status-pagamento.service.ts src\domain\services\calcular-status-pagamento.service.ts

git mv src\infrastructure\payment\database\pagamento.prisma-repository.ts src\infrastructure\database\pagamento.prisma-repository.ts
git mv src\infrastructure\payment\database\prisma.service.ts src\infrastructure\database\prisma.service.ts
git rm -q src\infrastructure\payment\database\prisma

git mv src\infrastructure\payment\jobs\taxa-armazenamento.jobs.ts src\infrastructure\jobs\taxa-armazenagem.job.ts

git mv src\notification\notfication.port.ts src\infrastructure\notification\notifier.port.ts
git mv src\notification\whatsapp.adapter.ts src\infrastructure\notification\whatsapp.adapter.ts

git rm -q src\infrastructure\payment\payment-getway.port.ts

git rm -q src\app\index.tsx
git mv src\app\nova.tsx techprime-os-app\src\app\nova.tsx

Write-Host "Reorganizacao concluida."
