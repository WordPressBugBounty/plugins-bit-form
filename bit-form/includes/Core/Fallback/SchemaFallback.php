<?php

namespace BitCode\BitForm\Core\Fallback;

use BitCode\BitForm\Core\Database\DB;

/**
 * Init-time schema guard for columns the FRONTEND read path depends on.
 *
 */
class SchemaFallback
{
  public function ensureEmailTemplateStatusColumn()
  {
    DB::ensureEmailTemplateStatusColumn();
  }

  public function ensureWorkflowCategoryColumn()
  {
    DB::ensureWorkflowCategoryColumn();
  }
}
