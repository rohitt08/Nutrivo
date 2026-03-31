param(
  [Parameter(Mandatory = $true)]
  [string]$Message,

  [string]$Branch = "main"
)

Set-Location -Path $PSScriptRoot

Write-Host "\n== Current status ==" -ForegroundColor Cyan
git status --short

$hasChanges = (git status --porcelain)
if (-not $hasChanges) {
  Write-Host "\nNo changes to commit. Repo is already clean." -ForegroundColor Yellow
  exit 0
}

Write-Host "\n== Staging changes ==" -ForegroundColor Cyan
git add .
if ($LASTEXITCODE -ne 0) {
  Write-Error "git add failed."
  exit 1
}

Write-Host "\n== Creating commit ==" -ForegroundColor Cyan
git commit -m $Message
if ($LASTEXITCODE -ne 0) {
  Write-Error "git commit failed."
  exit 1
}

Write-Host "\n== Pushing to origin/$Branch ==" -ForegroundColor Cyan
git push origin $Branch
if ($LASTEXITCODE -ne 0) {
  Write-Error "git push failed."
  exit 1
}

Write-Host "\n== Final status ==" -ForegroundColor Cyan
git status -sb
Write-Host "\nDone. Changes are pushed to GitHub." -ForegroundColor Green
